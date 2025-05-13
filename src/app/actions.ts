"use server";

import { FormData } from "@/context/FormContext";

/**
 * Server action to submit form data to the server
 */
export async function submitFormData(formData: FormData) {
  // In a real app, you would:
  // 1. Validate the data
  // 2. Store it in a database
  // 3. Handle any necessary emails or notifications

  try {
    // Simulating a server delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the data (for demonstration)
    console.log("Form data received:", formData);

    // You would typically store in a database here
    // await db.insert({ tableName: 'formSubmissions', data: formData })

    // Return success
    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message: "There was an error submitting the form. Please try again.",
    };
  }
}

/**
 * Server action to save partial form data (draft)
 */
export async function saveFormDraft(formData: FormData) {
  try {
    // Simulating a server delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Log the data (for demonstration)
    console.log("Draft saved:", formData);

    // You would typically store in a database with a draft status
    // await db.insert({ tableName: 'formDrafts', data: { ...formData, status: 'draft' } })

    return { success: true, message: "Draft saved successfully" };
  } catch (error) {
    console.error("Error saving draft:", error);
    return {
      success: false,
      message: "There was an error saving your progress. Please try again.",
    };
  }
}
