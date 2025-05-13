"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step3APage() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();

  // This page is exclusively for the court path
  // For simplicity, we'll just include a simple data collection form here

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({
      courtSpecific: {
        ...formData.courtSpecific,
        [name]: value,
      },
    });
  };

  const isFormValid = validateCurrentStep();

  return (
    <FormLayout title="Aktualny stan postępowania">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="court-case-no" className="font-medium">
                    Sygnatura akt sprawy
                    <InfoTooltip text="Podanie sygnatury sprawy jest opcjonalne, ale pomoże nam lepiej zrozumieć kontekst." />
                  </Label>
                </div>

                <Input
                  id="court-case-no"
                  name="caseNumber"
                  value={formData.courtSpecific?.caseNumber || ""}
                  onChange={handleInputChange}
                  placeholder="np. III RC 123/25"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="court-details" className="font-medium">
                    Dodatkowe informacje o postępowaniu
                    <InfoTooltip
                      text="Możesz podać więcej szczegółów, które pomogą nam lepiej zrozumieć Twoją sytuację."
                      wide
                    />
                  </Label>
                </div>

                <Textarea
                  id="court-details"
                  name="caseDetails"
                  value={formData.courtSpecific?.caseDetails || ""}
                  onChange={handleInputChange}
                  placeholder="Opisz aktualny stan postępowania, np. etap, główne kwestie sporne, itp."
                  className="w-full min-h-[100px]"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-2" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {isFormValid ? (
                  <Link href="/formularz/krok-4" passHref>
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
