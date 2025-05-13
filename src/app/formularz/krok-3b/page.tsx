"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step3BPage() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();

  // This is the simplified path that skips to the end
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      contact: {
        ...formData.contact,
        email: e.target.value,
      },
    });
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      contact: {
        ...formData.contact,
        consent: e.target.checked,
      },
    });
  };

  const isFormValid = validateCurrentStep();

  return (
    <FormLayout title="Zapisz się na powiadomienia">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-neutral-700">
                Wybrałeś/aś ścieżkę alternatywną. Możesz zostawić swój adres
                e-mail, aby otrzymać powiadomienie, gdy pojawią się nowe zasoby
                pomocne w Twojej sytuacji.
              </p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="email" className="font-medium">
                    Adres e-mail
                    <InfoTooltip text="Twój adres e-mail będzie przechowywany w bezpieczny sposób i używany wyłącznie do wysyłania powiadomień." />
                  </Label>
                </div>

                <Input
                  id="email"
                  type="email"
                  value={formData.contact?.email || ""}
                  onChange={handleEmailChange}
                  placeholder="twoj.email@przykład.pl"
                  className="w-full"
                />
              </div>

              <div className="flex items-start space-x-2 mt-4">
                <input
                  id="consent"
                  type="checkbox"
                  checked={formData.contact?.consent || false}
                  onChange={handleConsentChange}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-neutral-700">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                  otrzymywania powiadomień o nowych zasobach i funkcjach. Wiem,
                  że mogę wycofać zgodę w dowolnym momencie.
                </Label>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-2" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {isFormValid ? (
                  <Link href="/formularz/krok-12" passHref>
                    <Button className="flex-1">Zakończ</Button>
                  </Link>
                ) : (
                  <Button className="flex-1" disabled>
                    Zakończ
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
