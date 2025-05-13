"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function Step9OtherPage() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [agreement, setAgreement] = useState<string>(
    formData.otherSpecific?.agreement || ""
  );
  const [isFormValid, setIsFormValid] = useState(false);

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({
      otherSpecific: {
        ...formData.otherSpecific,
        agreement,
      },
    });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [agreement, formData.otherSpecific, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy handler zmiany pola tekstowego
  const handleAgreementChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAgreement(e.target.value);
    },
    []
  );

  return (
    <FormLayout title="Szczegóły porozumienia">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Label htmlFor="agreement-details" className="font-medium">
                    Opisz, jakie ustalenia dotyczące alimentów chcesz zawrzeć z
                    drugim rodzicem
                    <InfoTooltip
                      text="Opisz, jak chcielibyście uregulować kwestię finansowania potrzeb dziecka. Jeśli macie już jakieś ustalenia, opisz je tutaj."
                      wide
                    />
                  </Label>
                </div>{" "}
                <Textarea
                  id="agreement-details"
                  value={agreement}
                  onChange={handleAgreementChange}
                  placeholder="Np. Chcielibyśmy ustalić alimenty w wysokości... Rodzic 1 będzie dodatkowo pokrywać koszty... Rodzic 2 będzie odpowiedzialny za..."
                  className="min-h-[150px]"
                />
                <div className="mt-3">
                  <Label className="text-sm text-neutral-600">
                    Ta informacja pomoże nam przygotować lepsze rekomendacje
                    dotyczące porozumienia alimentacyjnego.
                  </Label>
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
