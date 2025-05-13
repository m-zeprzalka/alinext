"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoTooltip } from "@/components/form/InfoTooltip";

export default function Step2Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();

  const handleLegalBasisChange = (value: string) => {
    updateFormData({ legalBasis: value });
  };

  // Determine next route based on path
  const nextRoute =
    formData.path === "court" ? "/formularz/krok-3a" : "/formularz/krok-3b";
  const isFormValid = !!formData.legalBasis;

  return (
    <FormLayout title="Podstawy prawne">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="legal-basis" className="font-medium">
                    Na jakiej podstawie finansowane są obecnie potrzeby dziecka?
                    <InfoTooltip
                      text="Wybór podstawy prawnej pomoże lepiej dostosować kolejne pytania do Twojej sytuacji."
                      wide
                    />
                  </Label>
                </div>
                <Select
                  value={formData.legalBasis || ""}
                  onValueChange={handleLegalBasisChange}
                >
                  <SelectTrigger id="legal-basis" className="w-full">
                    <SelectValue placeholder="Wybierz podstawę prawną" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="court-ruling">
                      Orzeczenie sądu
                    </SelectItem>
                    <SelectItem value="agreement">
                      Pisemna umowa między rodzicami
                    </SelectItem>
                    <SelectItem value="verbal-agreement">
                      Ustne porozumienie między rodzicami
                    </SelectItem>
                    <SelectItem value="none">
                      Brak formalnych ustaleń
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-1" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {isFormValid ? (
                  <Link href={nextRoute} passHref>
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
