"use client";

import { FormData } from "@/context/FormContext";

/**
 * Mock data for testing the form
 */
export const mockFormData: FormData = {
  // Step 1: Initial selection
  path: "court",

  // Step 2: Basic information
  legalBasis: "Article 133 of the Family and Guardianship Code",

  // Step 3: Children information
  childrenCount: 2,
  children: [
    {
      name: "Julia Nowak",
      age: 7,
      gender: "female",
      specialNeeds: false,
    },
    {
      name: "Michał Nowak",
      age: 5,
      gender: "male",
      specialNeeds: true,
      specialNeedsDesc: "Asthma requiring regular medication",
    },
  ],

  // Step 4: Legal basis and relationship information
  relationship: "Divorced, cooperation possible",

  // Step 5: Care time
  careTime: {
    parent1Percentage: 70,
    parent2Percentage: 30,
  },

  // Step 6: Costs
  costs: {
    housing: 1200,
    food: 800,
    clothing: 300,
    education: 400,
    healthcare: 200,
    transportation: 150,
    recreation: 200,
    other: 100,
  },

  // Step 7: Income
  income: {
    parent1: 4500,
    parent2: 5500,
    noInfoParent2: false,
  },

  // Step 8-9: Specific to chosen path (court)
  courtSpecific: {
    adequacyRating: 3,
    caseNumber: "III RC 123/23",
    caseDetails: "Ongoing case at Family Court in Warsaw",
  },

  // Step 10: Demographics
  demographics: {
    age: "30-40",
    education: "Higher",
    region: "Mazowieckie",
  },

  // Step 11: Contact
  contact: {
    email: "test@example.com",
    consent: true,
    dataProcessingConsent: true,
    marketingConsent: false,
  },
};

/**
 * Load test data into the form
 */
export function loadTestData(): FormData {
  return { ...mockFormData };
}
