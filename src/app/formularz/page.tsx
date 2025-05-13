import { redirect } from "next/navigation";

export default function FormPage() {
  // Redirect to the first step
  redirect("/formularz/krok-1");
}
