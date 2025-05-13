"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Step1Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();

  const handlePathSelection = (path: "court" | "other") => {
    updateFormData({ path });
  };

  const isFormValid = validateCurrentStep();

  return (
    <FormLayout title="Wybierz ścieżkę">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Wybierz, co najlepiej opisuje Twoją sytuację:
              </h3>{" "}
              <div className="space-y-3">
                <Label
                  className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition"
                  onClick={() => handlePathSelection("court")}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="path"
                      checked={formData.path === "court"}
                      onChange={() => handlePathSelection("court")}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-semibold">
                        Trwa postępowanie sądowe
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Wybierz tę opcję, jeśli obecnie trwa postępowanie sądowe
                        dotyczące ustalenia wysokości alimentów
                      </p>
                    </div>
                  </div>
                </Label>

                <Label
                  className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition"
                  onClick={() => handlePathSelection("other")}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="path"
                      checked={formData.path === "other"}
                      onChange={() => handlePathSelection("other")}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <span className="font-semibold">
                        Zasady finansowania potrzeb dziecka nie zostały jeszcze
                        ustalone
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Wybierz tę opcję, jeśli planujesz polubowne ustalenie
                        zasad finansowania lub zastanawiasz się nad złożeniem
                        pozwu
                      </p>
                    </div>
                  </div>
                </Label>
              </div>{" "}
              {/* Use direct Link for navigation */}
              <div className="mt-6">
                {isFormValid ? (
                  <Link href="/formularz/krok-2" passHref>
                    <Button className="w-full">Dalej</Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled>
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
