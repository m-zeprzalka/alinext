"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState, useCallback } from "react";
import Link from "next/link";

export default function Step12Page() {
  // Używamy useFormContext() dla spójności, nawet jeśli nie korzystamy bezpośrednio z formData
  const { } = useFormContext();
  const [submissionId] = useState(() => {
    // Generate a unique submission ID
    return `ALI-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  });

  // In a real implementation, we would submit the form data to the server here
  // For demo purposes, we're just displaying a success message

  return (
    <FormLayout title="Dziękujemy!">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">
                Formularz został wysłany pomyślnie
              </h3>
              <p className="text-neutral-700">
                Dziękujemy za wypełnienie formularza. Twoje dane zostały
                zapisane i będą wykorzystane do przygotowania analizy dotyczącej
                alimentów.
              </p>
              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-lg">
                <p className="text-sm text-neutral-700 mb-2">
                  <strong>Numer zgłoszenia:</strong>
                </p>
                <div className="flex items-center justify-center gap-2">
                  <code className="bg-white px-3 py-1 rounded border border-neutral-200 font-mono text-neutral-800">
                    {submissionId}
                  </code>{" "}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={useCallback(() => {
                      navigator.clipboard.writeText(submissionId);
                    }, [submissionId])}
                  >
                    Kopiuj
                  </Button>
                </div>
              </div>
              <div className="space-y-2 mt-8">
                <p className="text-sm text-neutral-700">Co dalej?</p>
                <ul className="text-sm text-neutral-700 text-left space-y-2 list-disc pl-5">
                  <li>
                    Wyniki analizy zostaną przesłane na podany adres e-mail w
                    ciągu 24 godzin.
                  </li>
                  <li>
                    W razie pytań lub wątpliwości, skontaktuj się z nami,
                    podając numer zgłoszenia.
                  </li>
                  <li>
                    Zachowaj numer zgłoszenia - będzie potrzebny do dostępu do
                    wyników analizy.
                  </li>
                </ul>
              </div>{" "}
              <div className="mt-6">
                <Link href="/" passHref>
                  <Button className="w-full">Powrót do strony głównej</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-neutral-500 mt-8">
          <p>
            &copy; {new Date().getFullYear()} AliMatrix. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </FormLayout>
  );
}
