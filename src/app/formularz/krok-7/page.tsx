"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, memo, useCallback, useMemo } from "react";

// Cost category component
const CostCategory = memo(
  ({
    label,
    name,
    value,
    onChange,
    info,
  }: {
    label: string;
    name: string;
    value: number | undefined;
    onChange: (name: string, value: number) => void;
    info?: string;
  }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor={`cost-${name}`} className="font-medium">
            {label}
            {info && <InfoTooltip text={info} />}
          </Label>
        </div>
        <Input
          id={`cost-${name}`}
          type="number"
          min="0"
          value={value || ""}
          onChange={(e) => onChange(name, parseFloat(e.target.value) || 0)}
          className="w-full"
          placeholder="0"
        />
      </div>
    );
  }
);
CostCategory.displayName = "CostCategory";

export default function Step7Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [costs, setCosts] = useState<Record<string, number>>({
    housing: formData.costs?.housing || 0,
    food: formData.costs?.food || 0,
    clothing: formData.costs?.clothing || 0,
    education: formData.costs?.education || 0,
    healthcare: formData.costs?.healthcare || 0,
    transportation: formData.costs?.transportation || 0,
    recreation: formData.costs?.recreation || 0,
    other: formData.costs?.other || 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate total - memoizujemy wartość, aby nie przeliczać przy każdym renderze
  const total = useMemo(
    () => Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0),
    [costs]
  );

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({ costs });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [costs, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy funkcję zmiany wartości kosztów
  const handleCostChange = useCallback((name: string, value: number) => {
    setCosts((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <FormLayout title="Koszty utrzymania dzieci">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                Podaj średnie miesięczne koszty utrzymania wszystkich dzieci.
                Jeśli masz więcej niż jedno dziecko, podaj łączne koszty dla
                wszystkich dzieci.
              </p>{" "}
              <div className="grid gap-6 md:grid-cols-2">
                {useMemo(
                  () => (
                    <>
                      <CostCategory
                        label="Mieszkanie"
                        name="housing"
                        value={costs.housing}
                        onChange={handleCostChange}
                        info="Uwzględnij część kosztów mieszkania przypadającą na dzieci (czynsz, media, etc.)"
                      />

                      <CostCategory
                        label="Żywność"
                        name="food"
                        value={costs.food}
                        onChange={handleCostChange}
                        info="Szacunkowe miesięczne wydatki na żywność dla dzieci"
                      />

                      <CostCategory
                        label="Odzież"
                        name="clothing"
                        value={costs.clothing}
                        onChange={handleCostChange}
                        info="Ubrania, buty i inne elementy garderoby"
                      />

                      <CostCategory
                        label="Edukacja"
                        name="education"
                        value={costs.education}
                        onChange={handleCostChange}
                        info="Przedszkole, szkoła, korepetycje, książki, przybory szkolne"
                      />

                      <CostCategory
                        label="Opieka zdrowotna"
                        name="healthcare"
                        value={costs.healthcare}
                        onChange={handleCostChange}
                        info="Wizyty lekarskie, leki, terapie, ubezpieczenie"
                      />

                      <CostCategory
                        label="Transport"
                        name="transportation"
                        value={costs.transportation}
                        onChange={handleCostChange}
                        info="Dojazdy do szkoły, na zajęcia dodatkowe"
                      />

                      <CostCategory
                        label="Rekreacja"
                        name="recreation"
                        value={costs.recreation}
                        onChange={handleCostChange}
                        info="Zajęcia dodatkowe, rozrywka, wakacje"
                      />

                      <CostCategory
                        label="Inne"
                        name="other"
                        value={costs.other}
                        onChange={handleCostChange}
                        info="Wszystkie pozostałe wydatki na dzieci"
                      />
                    </>
                  ),
                  [costs, handleCostChange]
                )}
              </div>{" "}
              <div className="mt-6 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                {useMemo(
                  () => (
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        Suma miesięcznych kosztów:
                      </span>
                      <span className="font-semibold">{total} zł</span>
                    </div>
                  ),
                  [total]
                )}
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-6" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-8" passHref>
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
