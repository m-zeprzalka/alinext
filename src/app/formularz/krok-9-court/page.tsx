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

export default function Step9CourtPage() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [courtCase, setCourtCase] = useState(formData.courtCase || {});
  const [adequacyRating, setAdequacyRating] = useState<number>(
    formData.courtCase?.adequacyRating || 3
  );
  const [isFormValid, setIsFormValid] = useState(false);
  // Handle rating change
  const handleRatingChange = useCallback((value: number[]) => {
    setAdequacyRating(value[0]);
    setCourtCase((prev: typeof courtCase) => ({
      ...prev,
      adequacyRating: value[0],
    }));
  }, []);

  // Update form data when rating changes
  useEffect(() => {
    updateFormData({ courtCase });
    setIsFormValid(validateCurrentStep());
  }, [courtCase, updateFormData, validateCurrentStep]);

  // Format slider value for display
  const formatSliderValue = (value: number) => {
    const labels = [
      "1 - zupełnie nieadekwatny",
      "2 - raczej nieadekwatny",
      "3 - neutralny",
      "4 - raczej adekwatny",
      "5 - w pełni adekwatny",
    ];
    return labels[value - 1];
  };

  return (
    <FormLayout title="Postępowanie sądowe">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Twoja ocena propozycji drugiego rodzica
                </h3>
                <p className="text-neutral-700 text-sm">
                  Na podstawie wprowadzonych danych, drugi rodzic zobowiązany
                  jest do płacenia miesięcznie kwoty:{" "}
                  <strong className="text-lg font-semibold text-blue-600">
                    {formData.proposedAmount
                      ? `${formData.proposedAmount.toLocaleString("pl-PL")} zł`
                      : "..."}
                  </strong>
                </p>
                <Label className="text-base" htmlFor="adequacyRating">
                  Jak oceniasz adekwatność tej kwoty w stosunku do potrzeb
                  dziecka i sytuacji materialnej Twojej oraz drugiego rodzica?
                  <InfoTooltip
                    text="Twoja ocena pomoże nam lepiej zrozumieć Twoją perspektywę dotyczącą proponowanej kwoty alimentów."
                    wide
                  />
                </Label>{" "}
                <div className="text-sm text-neutral-600 mb-2">
                  Oceń w skali 1–5, gdzie 1 oznacza &quot;zupełnie
                  nieadekwatny&quot;, a 5 &quot;w pełni adekwatny&quot;
                </div>{" "}
                <div className="relative py-5">
                  {useMemo(
                    () => (
                      <Slider
                        value={[adequacyRating]}
                        onValueChange={handleRatingChange}
                        min={1}
                        max={5}
                        step={1}
                      />
                    ),
                    [adequacyRating, handleRatingChange]
                  )}
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-neutral-500">1</span>
                    <span className="text-xs text-neutral-500">2</span>
                    <span className="text-xs text-neutral-500">3</span>
                    <span className="text-xs text-neutral-500">4</span>
                    <span className="text-xs text-neutral-500">5</span>
                  </div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-md mt-2">
                  <p className="text-sm text-center font-medium">
                    {formatSliderValue(adequacyRating)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Propozycja ugody</h3>
                <p className="text-sm text-neutral-700">
                  Jeśli chcesz, możesz zaproponować własną kwotę, która według
                  Ciebie będzie odpowiednia i sprawiedliwa.
                </p>
                <p className="text-sm text-neutral-700">
                  Twoja propozycja zostanie uwzględniona w analizie jako
                  potencjalny punkt wyjścia do negocjacji.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-8" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {isFormValid ? (
                  <Link href="/formularz/krok-10" passHref>
                    <Button className="flex-1">Dalej</Button>
                  </Link>
                ) : (
                  <Button className="flex-1" disabled>
                    Dalej
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
