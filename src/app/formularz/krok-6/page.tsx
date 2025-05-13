"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Step6Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [careTimeParent1, setCareTimeParent1] = useState<number>(
    formData.careTime?.parent1Percentage || 50
  );
  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate parent 2 percentage as complementary to parent 1
  const careTimeParent2 = useMemo(
    () => 100 - careTimeParent1,
    [careTimeParent1]
  );

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({
      careTime: {
        parent1Percentage: careTimeParent1,
        parent2Percentage: careTimeParent2,
      },
    });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [careTimeParent1, careTimeParent2, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy funkcję zmiany wartości suwaka
  const handleSliderChange = useCallback((value: number[]) => {
    setCareTimeParent1(value[0]);
  }, []);

  return (
    <FormLayout title="Podział czasu opieki">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Label className="font-medium">
                    Jak jest podzielony czas opieki nad dziećmi?
                    <InfoTooltip
                      text="Zastanów się, jak wygląda podział opieki w typowym miesiącu. Przesuń suwak, aby zaznaczyć przybliżony procent czasu spędzanego z każdym z rodziców."
                      wide
                    />
                  </Label>
                </div>

                <div className="py-8">
                  {" "}
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Rodzic 1: {careTimeParent1}%
                    </span>
                    <span className="text-sm font-medium">
                      Rodzic 2: {careTimeParent2}%
                    </span>
                  </div>
                  {useMemo(
                    () => (
                      <Slider
                        value={[careTimeParent1]}
                        onValueChange={handleSliderChange}
                        min={0}
                        max={100}
                        step={5}
                        className="h-10"
                      />
                    ),
                    [careTimeParent1, handleSliderChange]
                  )}
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-600">
                      Wyłącznie Rodzic 1
                    </span>
                    <span className="text-xs text-neutral-600">Po równo</span>
                    <span className="text-xs text-neutral-600">
                      Wyłącznie Rodzic 2
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mt-4">
                  <p className="text-sm text-neutral-700">
                    <strong>Wskazówka:</strong> Czas opieki to jeden z ważnych
                    czynników uwzględnianych przy ustalaniu wysokości alimentów.
                    Im więcej czasu rodzic spędza z dzieckiem bezpośrednio
                    sprawując opiekę, tym więcej kosztów ponosi na bieżąco.
                  </p>
                </div>
              </div>{" "}
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-5" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-7" passHref>
                        <Button className="flex-1">Dalej</Button>
                      </Link>
                    ) : (
                      <Button className="flex-1" disabled>
                        Dalej
                      </Button>
                    ),
                  [isFormValid]
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
