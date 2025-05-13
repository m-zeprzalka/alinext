"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step10Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [demographics, setDemographics] = useState({
    age: formData.demographics?.age || "",
    education: formData.demographics?.education || "",
    region: formData.demographics?.region || "",
  });
  const [isFormValid, setIsFormValid] = useState(true); // Dane są opcjonalne, więc domyślnie true

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({ demographics });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [demographics, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  // Memoizujemy handler zmiany pól formularza
  const handleChange = useCallback((field: string, value: string) => {
    setDemographics((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return (
    <FormLayout title="Dane demograficzne">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                Podanie tych informacji jest opcjonalne, ale pomoże nam lepiej
                dostosować rekomendacje oraz analizować dane w celach
                statystycznych. Dane są anonimizowane.
              </p>
              <div className="space-y-6">
                {" "}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="age-group" className="font-medium">
                      Twój przedział wiekowy
                      <InfoTooltip text="Ta informacja pomoże nam lepiej zrozumieć Twoją sytuację." />
                    </Label>
                  </div>

                  {useMemo(
                    () => (
                      <Select
                        value={demographics.age}
                        onValueChange={(value) => handleChange("age", value)}
                      >
                        <SelectTrigger id="age-group" className="w-full">
                          <SelectValue placeholder="Wybierz przedział wiekowy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-24">18-24 lata</SelectItem>
                          <SelectItem value="25-34">25-34 lata</SelectItem>
                          <SelectItem value="35-44">35-44 lata</SelectItem>
                          <SelectItem value="45-54">45-54 lata</SelectItem>
                          <SelectItem value="55+">55 lat i więcej</SelectItem>
                        </SelectContent>
                      </Select>
                    ),
                    [demographics.age, handleChange]
                  )}
                </div>{" "}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="education" className="font-medium">
                      Wykształcenie
                      <InfoTooltip text="Ta informacja pomoże nam lepiej zrozumieć Twoją sytuację." />
                    </Label>
                  </div>

                  {useMemo(
                    () => (
                      <Select
                        value={demographics.education}
                        onValueChange={(value) =>
                          handleChange("education", value)
                        }
                      >
                        <SelectTrigger id="education" className="w-full">
                          <SelectValue placeholder="Wybierz poziom wykształcenia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Podstawowe</SelectItem>
                          <SelectItem value="vocational">Zawodowe</SelectItem>
                          <SelectItem value="secondary">Średnie</SelectItem>
                          <SelectItem value="higher">Wyższe</SelectItem>
                        </SelectContent>
                      </Select>
                    ),
                    [demographics.education, handleChange]
                  )}
                </div>{" "}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="region" className="font-medium">
                      Region zamieszkania
                      <InfoTooltip text="Ta informacja pomoże nam lepiej zrozumieć Twoją sytuację." />
                    </Label>
                  </div>

                  {useMemo(
                    () => (
                      <Select
                        value={demographics.region}
                        onValueChange={(value) => handleChange("region", value)}
                      >
                        <SelectTrigger id="region" className="w-full">
                          <SelectValue placeholder="Wybierz województwo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dolnoslaskie">
                            Dolnośląskie
                          </SelectItem>
                          <SelectItem value="kujawsko-pomorskie">
                            Kujawsko-Pomorskie
                          </SelectItem>
                          <SelectItem value="lubelskie">Lubelskie</SelectItem>
                          <SelectItem value="lubuskie">Lubuskie</SelectItem>
                          <SelectItem value="lodzkie">Łódzkie</SelectItem>
                          <SelectItem value="malopolskie">
                            Małopolskie
                          </SelectItem>
                          <SelectItem value="mazowieckie">
                            Mazowieckie
                          </SelectItem>
                          <SelectItem value="opolskie">Opolskie</SelectItem>
                          <SelectItem value="podkarpackie">
                            Podkarpackie
                          </SelectItem>
                          <SelectItem value="podlaskie">Podlaskie</SelectItem>
                          <SelectItem value="pomorskie">Pomorskie</SelectItem>
                          <SelectItem value="slaskie">Śląskie</SelectItem>
                          <SelectItem value="swietokrzyskie">
                            Świętokrzyskie
                          </SelectItem>
                          <SelectItem value="warminsko-mazurskie">
                            Warmińsko-Mazurskie
                          </SelectItem>
                          <SelectItem value="wielkopolskie">
                            Wielkopolskie
                          </SelectItem>
                          <SelectItem value="zachodniopomorskie">
                            Zachodniopomorskie
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ),
                    [demographics.region, handleChange]
                  )}
                </div>
              </div>{" "}
              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-lg mt-4">
                <p className="text-sm text-neutral-700">
                  <strong>Informacja:</strong> Podanie danych demograficznych
                  jest dobrowolne. Dane te są wykorzystywane do celów
                  statystycznych i badawczych, a także do lepszego dostosowania
                  rekomendacji.
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-9" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-11" passHref>
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
