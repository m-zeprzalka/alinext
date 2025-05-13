"use client";

import { FormData } from "@/context/FormContext";

const FORM_DATA_KEY = "alimatrix-form-data";
const FORM_STEP_KEY = "alimatrix-current-step";

/**
 * Save form data to localStorage
 */
export function saveFormToLocalStorage(data: FormData): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
  }
}

/**
 * Load form data from localStorage
 */
export function loadFormFromLocalStorage(): FormData | null {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(FORM_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      return null;
    }
  }
  return null;
}

/**
 * Save current step to localStorage
 */
export function saveCurrentStepToLocalStorage(step: number): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FORM_STEP_KEY, step.toString());
    } catch (error) {
      console.error("Error saving current step to localStorage:", error);
    }
  }
}

/**
 * Load current step from localStorage
 */
export function loadCurrentStepFromLocalStorage(): number | null {
  if (typeof window !== "undefined") {
    try {
      const step = localStorage.getItem(FORM_STEP_KEY);
      return step ? parseInt(step, 10) : null;
    } catch (error) {
      console.error("Error loading current step from localStorage:", error);
      return null;
    }
  }
  return null;
}

/**
 * Clear all form data from localStorage
 */
export function clearFormDataFromLocalStorage(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(FORM_DATA_KEY);
      localStorage.removeItem(FORM_STEP_KEY);
    } catch (error) {
      console.error("Error clearing form data from localStorage:", error);
    }
  }
}
