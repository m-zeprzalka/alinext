"use client";

import { useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { usePathname } from "next/navigation";

/**
 * Komponent FormController do zarządzania stanami kroków
 * Umieść ten komponent na każdej stronie formularza
 */
export function FormController() {
  const { goToStep } = useFormContext();
  const pathname = usePathname();

  // Znajdź numer kroku na podstawie URL
  useEffect(() => {
    // Extract step from URL pattern like /formularz/krok-X
    const match = pathname.match(/\/formularz\/krok-(\d+[a-b]?|[a-z0-9-]+)/);

    if (match) {
      const stepString = match[1];
      // Handle special steps like "3a" or "9-court"
      if (!isNaN(parseInt(stepString))) {
        const stepNumber = parseInt(stepString);
        goToStep(stepNumber);
      }
    }
  }, [pathname, goToStep]);

  return null; // Komponent nie renderuje nic
}
