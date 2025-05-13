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
  const [adequacyRating, setAdequacyRating] = useState<number>(
    formData.courtSpecific?.adequacyRating || 3
  );
  const [isFormValid, setIsFormValid] = useState(false);

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({
      courtSpecific: {
        ...formData.courtSpecific,
        adequacyRating,
      },
    });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [
    adequacyRating,
    formData.courtSpecific,
    updateFormData,
    validateCurrentStep,
  ]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy funkcję do zmiany wartości suwaka
  const handleRatingChange = useCallback((value: number[]) => {
    setAdequacyRating(value[0]);
  }, []);

  return (
    <FormLayout title="Ocena adekwatności">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="font-medium">
                  Jak oceniasz adekwatność kwoty alimentów proponowanej przez
                  drugiego rodzica?
                  <InfoTooltip
                    text="Twoja ocena pomoże nam lepiej zrozumieć Twoją perspektywę dotyczącą proponowanej kwoty alimentów."
                    wide
                  />
                </Label>{" "}
                <div className="text-sm text-neutral-600 mb-2">
                  Oceń w skali 1–5, gdzie 1 oznacza &ldquo;zupełnie
                  nieadekwatny&rdquo;, a 5 &ldquo;w pełni adekwatny&rdquo;
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
                        className="h-10"
                      />
                    ),
                    [adequacyRating, handleRatingChange]
                  )}

                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-neutral-600">
                      Zupełnie nieadekwatny
                    </span>
                    <span className="text-xs text-neutral-600">
                      W pełni adekwatny
                    </span>
                  </div>
                </div>{" "}
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mt-6">
                  {useMemo(
                    () => (
                      <p className="text-sm text-neutral-700">
                        {adequacyRating === 1 && (
                          <span>
                            <strong>Zupełnie nieadekwatny:</strong> Proponowana
                            kwota kompletnie nie pokrywa podstawowych potrzeb
                            dziecka.
                          </span>
                        )}
                        {adequacyRating === 2 && (
                          <span>
                            <strong>Raczej nieadekwatny:</strong> Proponowana
                            kwota pokrywa tylko część podstawowych potrzeb
                            dziecka.
                          </span>
                        )}
                        {adequacyRating === 3 && (
                          <span>
                            <strong>Umiarkowanie adekwatny:</strong> Proponowana
                            kwota pokrywa podstawowe potrzeby, ale nie
                            uwzględnia wszystkich istotnych wydatków.
                          </span>
                        )}
                        {adequacyRating === 4 && (
                          <span>
                            <strong>Raczej adekwatny:</strong> Proponowana kwota
                            pokrywa większość potrzeb dziecka w sposób
                            satysfakcjonujący.
                          </span>
                        )}
                        {adequacyRating === 5 && (
                          <span>
                            <strong>W pełni adekwatny:</strong> Proponowana
                            kwota w pełni zaspokaja wszystkie uzasadnione
                            potrzeby dziecka.
                          </span>
                        )}
                      </p>
                    ),
                    [adequacyRating]
                  )}
                </div>
              </div>{" "}
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-8" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-10" passHref>
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
