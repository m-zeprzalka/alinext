"use client";

import { FormLayout } from "@/components/form/FormLayout";
import { useFormContext } from "@/context/FormContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Step9Page() {
  const { formData } = useFormContext();

  // Redirect to the appropriate variant based on the selected path
  useEffect(() => {
    if (formData.path === "court") {
      redirect("/formularz/krok-9-court");
    } else if (formData.path === "other") {
      redirect("/formularz/krok-9-other");
    }
  }, [formData.path]);

  return (
    <FormLayout title="Przetwarzanie...">
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <p>Proszę czekać, trwa przekierowanie...</p>
        </div>
      </div>
    </FormLayout>
  );
}
