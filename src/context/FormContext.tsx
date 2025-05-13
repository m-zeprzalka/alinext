"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  saveFormToLocalStorage,
  loadFormFromLocalStorage,
  saveCurrentStepToLocalStorage,
  loadCurrentStepFromLocalStorage,
  clearFormDataFromLocalStorage,
} from "@/lib/storage";

// Type for our form data
export interface FormData {
  // Step 1: Initial selection
  path?: "court" | "other";

  // Step 2: Basic information
  legalBasis?: string;

  // Step 3: Children information
  childrenCount?: number;
  children?: {
    name?: string;
    age?: number;
    gender?: string;
    specialNeeds?: boolean;
    specialNeedsDesc?: string;
  }[];
  // Step 4: Legal basis and relationship information
  relationship?: string;

  // Step 4-5: Care time and costs
  careTime?: {
    parent1Percentage?: number;
    parent2Percentage?: number;
  };

  // Step 6: Costs
  costs?: {
    housing?: number;
    food?: number;
    clothing?: number;
    education?: number;
    healthcare?: number;
    transportation?: number;
    recreation?: number;
    other?: number;
  };

  // Step 7: Income
  income?: {
    parent1?: number;
    parent2?: number;
    noInfoParent2?: boolean;
  };

  // Step 8-9: Specific to chosen path
  courtSpecific?: {
    adequacyRating?: number;
    caseNumber?: string;
    caseDetails?: string;
  };
  otherSpecific?: {
    agreement?: string;
  };

  // Step 10: Demographics
  demographics?: {
    age?: string;
    education?: string;
    region?: string;
  };
  // Step 11: Contact
  contact?: {
    email?: string;
    consent?: boolean;
    dataProcessingConsent?: boolean;
    marketingConsent?: boolean;
  };
}

interface FormContextType {
  formData: FormData;
  currentStep: number;
  updateFormData: (newData: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  validateCurrentStep: () => boolean;
  generateStepUrl: (step: number | string) => string;
  isLoading: boolean;
  errors: Record<string, string[]>;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Define step dependencies and flow
interface StepFlow {
  [key: number]: {
    next?: number | ((formData: FormData) => number);
    prev?: number | ((formData: FormData) => number);
  };
}

export const STEP_FLOW: StepFlow = {
  1: { next: 2 },
  2: { next: 3, prev: 1 },
  3: {
    next: (formData) => (formData.path === "court" ? 4 : 12),
    prev: 2,
  },
  4: { next: 5, prev: 3 },
  5: { next: 6, prev: 4 },
  6: { next: 7, prev: 5 },
  7: { next: 8, prev: 6 },
  8: { next: 9, prev: 7 },
  9: { next: 10, prev: 8 },
  10: { next: 11, prev: 9 },
  11: { next: 12, prev: 10 },
  12: { prev: 11 },
};

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Load saved form data and current step on initial render
  useEffect(() => {
    const savedFormData = loadFormFromLocalStorage();
    const savedStep = loadCurrentStepFromLocalStorage();

    if (savedFormData) {
      setFormData(savedFormData);
    }

    if (savedStep) {
      setCurrentStep(savedStep);
    }

    setIsInitialized(true);
  }, []);

  // Save form data and current step whenever they change
  useEffect(() => {
    if (isInitialized) {
      saveFormToLocalStorage(formData);
      saveCurrentStepToLocalStorage(currentStep);
    }
  }, [formData, currentStep, isInitialized]);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Reset the form to initial state
  const resetForm = () => {
    setFormData({});
    setCurrentStep(1);
    setErrors({});
    // Clear from local storage too
    clearFormDataFromLocalStorage();
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      const nextStep = getNextStep(currentStep, formData);
      if (nextStep) {
        setCurrentStep(nextStep);
        // Navigation is now handled by the FormNavigation component
      }
    }
  };

  const goToPrevStep = () => {
    const prevStep = getPrevStep(currentStep, formData);
    if (prevStep) {
      setCurrentStep(prevStep);
      // Navigation is now handled by the FormNavigation component
    }
  };
  // Validate current step data
  const validateCurrentStep = () => {
    // Add validation logic for each step
    switch (currentStep) {
      case 1:
        return !!formData.path;
      case 2:
        return !!formData.legalBasis;
      case 3:
        return !!formData.childrenCount && formData.childrenCount > 0;
      case 4:
        return !!formData.relationship;
      case 5:
        return (
          formData.careTime?.parent1Percentage !== undefined &&
          formData.careTime?.parent2Percentage !== undefined
        );
      case 6:
        // Ensure at least one cost value is provided
        return (
          !!formData.costs &&
          Object.values(formData.costs).some((value) => value !== undefined)
        );
      case 7:
        // Check for parent1 income or noInfoParent2 flag
        return (
          (!!formData.income?.parent1 || formData.income?.parent1 === 0) &&
          (!!formData.income?.parent2 ||
            formData.income?.noInfoParent2 === true)
        );
      case 8:
        // Path-specific validations will be handled in step 9
        return true;
      case 9:
        // Validate based on path
        if (formData.path === "court") {
          return (
            !!formData.courtSpecific?.adequacyRating &&
            !!formData.courtSpecific?.caseNumber
          );
        } else {
          return !!formData.otherSpecific?.agreement;
        }
      case 10:
        return !!formData.demographics;
      case 11:
        return (
          !!formData.contact?.email &&
          formData.contact?.dataProcessingConsent === true
        );
      default:
        return true;
    }
  }; // Generate URL for a specific step
  const generateStepUrl = (step: number | string) => {
    // Special case for step 3
    if (step === 3 && formData.path) {
      // For step 3, we have 3a and 3b variants
      if (formData.path === "court") {
        return `/formularz/krok-3a`;
      } else {
        return `/formularz/krok-3b`;
      }
    }

    // Special case for step 9 which has variants based on path
    if (step === 9 && formData.path) {
      return `/formularz/krok-9-${formData.path}`;
    }

    if (typeof step === "number") {
      return `/formularz/krok-${step}`;
    }

    return `/formularz/krok-${step}`;
  };
  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        goToNextStep,
        goToPrevStep,
        goToStep,
        validateCurrentStep,
        generateStepUrl,
        isLoading,
        errors,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// Helper function to get next step based on current step and form data
function getNextStep(currentStep: number, formData: FormData): number | null {
  // Handle special cases based on form data
  if (currentStep === 2) {
    // After step 2, route to 3
    return 3;
  }

  // Special case for step 8 to determine the path variant for step 9
  if (currentStep === 8) {
    // Generate appropriate URL for step 9 based on the path
    return 9;
  }

  // Standard flow from the STEP_FLOW
  if (currentStep in STEP_FLOW) {
    const flow = STEP_FLOW[currentStep];
    if (flow && flow.next !== undefined) {
      // Check if next is a function or a number
      if (typeof flow.next === "function") {
        return flow.next(formData);
      }
      return flow.next;
    }
  }

  // Default to next number if not found in flow
  return currentStep + 1;
}

// Helper function to get previous step based on current step and form data
function getPrevStep(currentStep: number, formData: FormData): number | null {
  // Handle special cases based on form data
  if (currentStep === 4) {
    // Before step 4, go back to 3
    return 3;
  }

  // Standard flow from the STEP_FLOW
  if (currentStep in STEP_FLOW) {
    const flow = STEP_FLOW[currentStep];
    if (flow && flow.prev !== undefined) {
      // Check if prev is a function or a number
      if (typeof flow.prev === "function") {
        return flow.prev(formData);
      }
      return flow.prev;
    }
  }

  // Default to previous number if not found in flow and not at step 1
  return currentStep > 1 ? currentStep - 1 : null;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
