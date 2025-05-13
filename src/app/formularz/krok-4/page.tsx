"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoTooltip } from "@/components/form/InfoTooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step4Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();

  const handleRelationChange = (value: string) => {
    updateFormData({
      relationship: value,
    });
  };

  const isFormValid = validateCurrentStep();

  return (
    <FormLayout title="Dodatkowe informacje">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="relationship-status" className="font-medium">
                    W jakim jesteś związku z drugim rodzicem?
                    <InfoTooltip
                      text="Ta informacja pomoże nam lepiej zrozumieć kontekst Twojej sytuacji."
                      wide
                    />
                  </Label>
                </div>

                <Select
                  value={formData.relationship || ""}
                  onValueChange={handleRelationChange}
                >
                  <SelectTrigger id="relationship-status" className="w-full">
                    <SelectValue placeholder="Wybierz rodzaj relacji" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="separated">
                      Rozstaliśmy się (bez rozwodu)
                    </SelectItem>
                    <SelectItem value="divorced">
                      Jesteśmy po rozwodzie
                    </SelectItem>
                    <SelectItem value="divorce-in-progress">
                      Jesteśmy w trakcie rozwodu
                    </SelectItem>
                    <SelectItem value="never-together">
                      Nigdy nie byliśmy w związku
                    </SelectItem>
                    <SelectItem value="together">Jesteśmy w związku</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-neutral-600 mt-4">
                Informacja o relacji z drugim rodzicem pomoże nam lepiej
                dopasować rekomendacje do Twojej sytuacji. Wszystkie dane są
                przetwarzane zgodnie z zasadami RODO.
              </p>

              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-3a" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {isFormValid ? (
                  <Link href="/formularz/krok-5" passHref>
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
