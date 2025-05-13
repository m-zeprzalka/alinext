"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step8Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [income, setIncome] = useState({
    parent1: formData.income?.parent1 || 0,
    parent2: formData.income?.parent2 || 0,
    noInfoParent2: formData.income?.noInfoParent2 || false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({ income });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [income, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy handler zmiany dochodu
  const handleIncomeChange = useCallback(
    (parent: "parent1" | "parent2", value: number) => {
      setIncome((prev) => ({
        ...prev,
        [parent]: value,
      }));
    },
    []
  );

  // Memoizujemy handler zmiany checkbox'a
  const handleNoInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setIncome((prev) => ({
        ...prev,
        noInfoParent2: checked,
        // Reset parent2 income if no info is checked
        parent2: checked ? 0 : prev.parent2,
      }));
    },
    []
  );

  return (
    <FormLayout title="Dochody rodziców">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                Podaj szacunkowe miesięczne dochody netto (na rękę) obu
                rodziców. Te informacje są kluczowe do ustalenia
                proporcjonalnego udziału w kosztach utrzymania dzieci.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  {" "}
                  <div className="flex items-center">
                    <Label htmlFor="income-parent1" className="font-medium">
                      Twój miesięczny dochód netto (zł)
                      <InfoTooltip text="Uwzględnij wszystkie źródła dochodu: wynagrodzenie, działalność gospodarcza, najem, itp." />
                    </Label>
                  </div>
                  {useMemo(
                    () => (
                      <Input
                        id="income-parent1"
                        type="number"
                        min="0"
                        value={income.parent1 || ""}
                        onChange={(e) =>
                          handleIncomeChange(
                            "parent1",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full"
                        placeholder="0"
                      />
                    ),
                    [income.parent1, handleIncomeChange]
                  )}
                </div>

                <div className="space-y-2">
                  {" "}
                  <div className="flex items-center">
                    <Label htmlFor="income-parent2" className="font-medium">
                      Miesięczny dochód netto drugiego rodzica (zł)
                      <InfoTooltip text="Jeśli nie znasz dokładnej kwoty, podaj szacunkową wartość. Możesz też zaznaczyć opcję poniżej." />
                    </Label>
                  </div>
                  {useMemo(
                    () =>
                      !income.noInfoParent2 && (
                        <Input
                          id="income-parent2"
                          type="number"
                          min="0"
                          value={income.parent2 || ""}
                          onChange={(e) =>
                            handleIncomeChange(
                              "parent2",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full"
                          placeholder="0"
                          disabled={income.noInfoParent2}
                        />
                      ),
                    [income.noInfoParent2, income.parent2, handleIncomeChange]
                  )}
                  {useMemo(
                    () => (
                      <div className="flex items-start space-x-2 mt-2">
                        <input
                          id="no-info-parent2"
                          type="checkbox"
                          checked={income.noInfoParent2}
                          onChange={handleNoInfoChange}
                          className="mt-1"
                        />
                        <Label htmlFor="no-info-parent2" className="text-sm">
                          Nie posiadam informacji o dochodach drugiego rodzica
                        </Label>
                      </div>
                    ),
                    [income.noInfoParent2, handleNoInfoChange]
                  )}
                </div>
              </div>{" "}
              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-lg mt-4">
                <p className="text-sm text-neutral-700">
                  <strong>Wskazówka:</strong> Zasada proporcjonalności zakłada,
                  że rodzice powinni partycypować w kosztach utrzymania dziecka
                  proporcjonalnie do swoich możliwości zarobkowych i
                  majątkowych.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-7" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-9" passHref>
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
