"use client";

import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormContext";
import Link from "next/link";
import { useMemo } from "react";

interface FormNavigationProps {
  showNext?: boolean;
  showPrev?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  nextDisabled?: boolean;
  className?: string;
  nextHref?: string;
  prevHref?: string;
  isSubmit?: boolean;
}

export function FormNavigation({
  showNext = true,
  showPrev = true,
  nextLabel = "Dalej",
  prevLabel = "Wstecz",
  nextDisabled = false,
  className = "mt-6 flex gap-3",
  nextHref,
  prevHref,
  isSubmit = false,
}: FormNavigationProps) {
  const { currentStep, validateCurrentStep, generateStepUrl } =
    useFormContext();

  // Determine if form is valid
  const isFormValid = useMemo(
    () => validateCurrentStep(),
    [validateCurrentStep]
  );

  // Compute appropriate URLs
  const prevStepUrl = useMemo(() => {
    if (prevHref) return prevHref;
    const prevStepNumber = currentStep > 1 ? currentStep - 1 : 1;
    return generateStepUrl(prevStepNumber);
  }, [prevHref, currentStep, generateStepUrl]);

  const nextStepUrl = useMemo(() => {
    if (nextHref) return nextHref;
    const nextStepNumber = currentStep + 1;
    return generateStepUrl(nextStepNumber);
  }, [nextHref, currentStep, generateStepUrl]);

  // Set final step label
  const finalNextLabel = useMemo(() => {
    if (currentStep === 11) {
      return "Zakończ";
    }
    return nextLabel;
  }, [currentStep, nextLabel]);

  return (
    <div className={className}>
      {showPrev && (
        <Link href={prevStepUrl} passHref>
          <Button variant="outline" className="flex-1">
            {prevLabel}
          </Button>
        </Link>
      )}
      {showNext && (
        <>
          {!nextDisabled && isFormValid ? (
            <Link href={nextStepUrl} passHref>
              <Button className="flex-1" type={isSubmit ? "submit" : "button"}>
                {finalNextLabel}
              </Button>
            </Link>
          ) : (
            <Button
              className="flex-1"
              disabled
              type={isSubmit ? "submit" : "button"}
            >
              {finalNextLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
}
