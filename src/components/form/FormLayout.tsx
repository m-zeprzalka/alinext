"use client";

import { ReactNode } from "react";
import { useFormContext } from "@/context/FormContext";
import { Progress } from "@/components/ui/progress";

interface FormLayoutProps {
  children: ReactNode;
  title?: string;
}

export function FormLayout({ children, title }: FormLayoutProps) {
  const { currentStep } = useFormContext();

  // Calculate progress percentage (12 steps total)
  const progress = Math.round((currentStep / 12) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress value={progress} className="h-1 rounded-none" />
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-1 z-40 p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">AliMatrix</h1>
          <div className="text-sm text-neutral-500">
            Krok {currentStep} z 12
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="flex-1 max-w-md mx-auto px-4 py-6 w-full">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </main>
    </div>
  );
}
