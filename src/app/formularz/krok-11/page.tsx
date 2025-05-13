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

export default function Step11Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [contact, setContact] = useState({
    email: formData.contact?.email || "",
    consent: formData.contact?.consent || false,
    dataProcessingConsent: formData.contact?.dataProcessingConsent || false,
    marketingConsent: formData.contact?.marketingConsent || false,
  });

  const [emailValid, setEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  // Memoizujemy walidację emaila
  const validateEmail = useCallback((email: string) => {
    if (!email) return true; // pusty email jest poprawny (opcjonalny)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, []);

  // Używamy useCallback do aktualizacji formData i walidacji
  const updateFormDataCallback = useCallback(() => {
    updateFormData({ contact });
    const valid =
      validateCurrentStep() &&
      (validateEmail(contact.email) || !contact.email) &&
      contact.dataProcessingConsent;
    setIsFormValid(valid);
  }, [contact, updateFormData, validateCurrentStep, validateEmail]);

  // Używamy jednego efektu do aktualizacji danych z debounce
  useEffect(() => {
    // Aktualizacja walidacji emaila
    setEmailValid(validateEmail(contact.email));

    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [contact, updateFormDataCallback, validateEmail]);

  // Memoizujemy handler zmiany emaila
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContact((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    },
    []
  );

  // Memoizujemy handler zmiany zgody
  const handleConsentChange = useCallback((field: string, value: boolean) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return (
    <FormLayout title="Kontakt i zgody">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                Aby otrzymać wyniki analizy, podaj swój adres e-mail. Twoje dane
                będą przetwarzane zgodnie z polityką prywatności.
              </p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="email" className="font-medium">
                    Adres e-mail
                    <InfoTooltip text="Na ten adres wyślemy wyniki analizy i dodatkowe materiały pomocnicze." />
                  </Label>
                </div>

                {useMemo(
                  () => (
                    <Input
                      id="email"
                      type="email"
                      value={contact.email}
                      onChange={handleEmailChange}
                      placeholder="twoj.email@przykład.pl"
                      className={`w-full ${
                        !emailValid ? "border-red-500" : ""
                      }`}
                    />
                  ),
                  [contact.email, emailValid, handleEmailChange]
                )}

                {!emailValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Podaj prawidłowy adres e-mail
                  </p>
                )}
              </div>

              <div className="space-y-4 mt-6">
                {useMemo(
                  () => (
                    <div className="flex items-start space-x-2">
                      <input
                        id="data-processing-consent"
                        type="checkbox"
                        checked={contact.dataProcessingConsent}
                        onChange={(e) =>
                          handleConsentChange(
                            "dataProcessingConsent",
                            e.target.checked
                          )
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="data-processing-consent"
                        className="text-sm"
                      >
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w
                        celu przeprowadzenia analizy i przygotowania raportu
                        dotyczącego alimentów. (wymagane)
                      </Label>
                    </div>
                  ),
                  [contact.dataProcessingConsent, handleConsentChange]
                )}

                {useMemo(
                  () => (
                    <div className="flex items-start space-x-2">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={contact.consent}
                        onChange={(e) =>
                          handleConsentChange("consent", e.target.checked)
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="consent" className="text-sm">
                        Wyrażam zgodę na otrzymywanie informacji o
                        aktualizacjach raportu i nowych funkcjach serwisu.
                      </Label>
                    </div>
                  ),
                  [contact.consent, handleConsentChange]
                )}

                {useMemo(
                  () => (
                    <div className="flex items-start space-x-2">
                      <input
                        id="marketing-consent"
                        type="checkbox"
                        checked={contact.marketingConsent}
                        onChange={(e) =>
                          handleConsentChange(
                            "marketingConsent",
                            e.target.checked
                          )
                        }
                        className="mt-1"
                      />
                      <Label htmlFor="marketing-consent" className="text-sm">
                        Wyrażam zgodę na otrzymywanie informacji marketingowych
                        dotyczących usług prawnych i mediacyjnych.
                      </Label>
                    </div>
                  ),
                  [contact.marketingConsent, handleConsentChange]
                )}
              </div>

              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-lg mt-4">
                <p className="text-sm text-neutral-700">
                  <strong>Informacja o ochronie danych:</strong> Twoje dane
                  osobowe są chronione zgodnie z RODO. Adres e-mail jest
                  szyfrowany przed zapisaniem w bazie danych. Więcej informacji
                  w naszej polityce prywatności.
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-10" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(
                  () =>
                    isFormValid ? (
                      <Link href="/formularz/krok-12" passHref>
                        <Button className="flex-1">Zakończ</Button>
                      </Link>
                    ) : (
                      <Button className="flex-1" disabled>
                        Zakończ
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
