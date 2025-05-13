"use client";

import { FormProvider } from "@/context/FormContext";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}
