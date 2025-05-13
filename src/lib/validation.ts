"use client";

import { FormData } from "@/context/FormContext";

// Type for validation errors
export type ValidationErrors = Record<string, string[]>;

/**
 * Validates the entire form data
 */
export function validateFormData(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Step 1: Path selection
  if (!data.path) {
    addError(errors, "path", "Please select a path");
  }

  // Step 2: Legal basis
  if (!data.legalBasis) {
    addError(errors, "legalBasis", "Legal basis is required");
  }

  // Step 3: Children information
  if (!data.childrenCount || data.childrenCount <= 0) {
    addError(errors, "childrenCount", "At least one child must be specified");
  }

  if (data.children) {
    data.children.forEach((child, index) => {
      if (!child.name) {
        addError(errors, `children[${index}].name`, "Child's name is required");
      }
      if (!child.age) {
        addError(errors, `children[${index}].age`, "Child's age is required");
      }
      if (child.specialNeeds && !child.specialNeedsDesc) {
        addError(
          errors,
          `children[${index}].specialNeedsDesc`,
          "Please describe the special needs"
        );
      }
    });
  }

  // Step 4: Relationship
  if (!data.relationship) {
    addError(errors, "relationship", "Relationship information is required");
  }

  // Step 5: Care time
  if (
    !data.careTime?.parent1Percentage &&
    data.careTime?.parent1Percentage !== 0
  ) {
    addError(
      errors,
      "careTime.parent1Percentage",
      "Parent 1 care time percentage is required"
    );
  }
  if (
    !data.careTime?.parent2Percentage &&
    data.careTime?.parent2Percentage !== 0
  ) {
    addError(
      errors,
      "careTime.parent2Percentage",
      "Parent 2 care time percentage is required"
    );
  }
  if (
    data.careTime?.parent1Percentage !== undefined &&
    data.careTime?.parent2Percentage !== undefined &&
    data.careTime.parent1Percentage + data.careTime.parent2Percentage !== 100
  ) {
    addError(errors, "careTime", "The care time percentages must sum to 100%");
  }

  // Step 6: Costs
  if (data.costs) {
    const hasAnyCost = Object.values(data.costs).some(
      (value) => value !== undefined && value !== null
    );
    if (!hasAnyCost) {
      addError(errors, "costs", "At least one cost category must be filled");
    }
  } else {
    addError(errors, "costs", "Cost information is required");
  }

  // Step 7: Income
  if (!data.income?.parent1 && data.income?.parent1 !== 0) {
    addError(errors, "income.parent1", "Parent 1 income is required");
  }
  if (
    !data.income?.parent2 &&
    data.income?.parent2 !== 0 &&
    !data.income?.noInfoParent2
  ) {
    addError(
      errors,
      "income.parent2",
      "Either provide Parent 2 income or check 'No information'"
    );
  }

  // Step 9: Path specific
  if (data.path === "court") {
    if (!data.courtSpecific?.adequacyRating) {
      addError(
        errors,
        "courtSpecific.adequacyRating",
        "Adequacy rating is required"
      );
    }
    if (!data.courtSpecific?.caseNumber) {
      addError(errors, "courtSpecific.caseNumber", "Case number is required");
    }
  } else if (data.path === "other") {
    if (!data.otherSpecific?.agreement) {
      addError(
        errors,
        "otherSpecific.agreement",
        "Agreement information is required"
      );
    }
  }

  // Step 10: Demographics
  if (!data.demographics?.age) {
    addError(errors, "demographics.age", "Age range is required");
  }
  if (!data.demographics?.education) {
    addError(errors, "demographics.education", "Education level is required");
  }
  if (!data.demographics?.region) {
    addError(errors, "demographics.region", "Region is required");
  }

  // Step 11: Contact
  if (!data.contact?.email) {
    addError(errors, "contact.email", "Email is required");
  } else if (!isValidEmail(data.contact.email)) {
    addError(errors, "contact.email", "Please enter a valid email address");
  }
  if (!data.contact?.dataProcessingConsent) {
    addError(
      errors,
      "contact.dataProcessingConsent",
      "You must consent to data processing to continue"
    );
  }

  return errors;
}

/**
 * Validates a single step of the form
 */
export function validateStep(step: number, data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  switch (step) {
    case 1:
      if (!data.path) {
        addError(errors, "path", "Please select a path");
      }
      break;
    case 2:
      if (!data.legalBasis) {
        addError(errors, "legalBasis", "Legal basis is required");
      }
      break;
    case 3:
      if (!data.childrenCount || data.childrenCount <= 0) {
        addError(
          errors,
          "childrenCount",
          "At least one child must be specified"
        );
      }
      if (data.children) {
        data.children.forEach((child, index) => {
          if (!child.name) {
            addError(
              errors,
              `children[${index}].name`,
              "Child's name is required"
            );
          }
          if (!child.age) {
            addError(
              errors,
              `children[${index}].age`,
              "Child's age is required"
            );
          }
        });
      }
      break;
    // Add cases for other steps following the pattern above
  }

  return errors;
}

// Helper function to add an error
function addError(errors: ValidationErrors, field: string, message: string) {
  if (!errors[field]) {
    errors[field] = [];
  }
  errors[field].push(message);
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
