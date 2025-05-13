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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, memo, useCallback, useMemo } from "react";

// Child form component
const ChildForm = memo(
  ({
    index,
    childData = {},
    onChange,
  }: {
    index: number;
    childData: any;
    onChange: (index: number, data: any) => void;
  }) => {
    const handleChange = (field: string, value: any) => {
      const updatedData = { ...childData, [field]: value };
      onChange(index, updatedData);
    };

    return (
      <div className="border border-neutral-200 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-lg">Dziecko {index + 1}</h4>

        <div className="space-y-2">
          <Label
            htmlFor={`child-${index}-name`}
            className="text-sm font-medium"
          >
            Imię dziecka (opcjonalnie)
          </Label>
          <Input
            id={`child-${index}-name`}
            value={childData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Imię dziecka"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`child-${index}-age`} className="text-sm font-medium">
            Wiek dziecka
          </Label>
          <Input
            id={`child-${index}-age`}
            type="number"
            min="0"
            max="26"
            value={childData.age || ""}
            onChange={(e) => handleChange("age", parseInt(e.target.value))}
            placeholder="Wiek w latach"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`child-${index}-gender`}
            className="text-sm font-medium"
          >
            Płeć dziecka
          </Label>
          <Select
            value={childData.gender || ""}
            onValueChange={(value) => handleChange("gender", value)}
          >
            <SelectTrigger id={`child-${index}-gender`}>
              <SelectValue placeholder="Wybierz płeć" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Dziewczynka</SelectItem>
              <SelectItem value="male">Chłopiec</SelectItem>
              <SelectItem value="other">Inna/Nie chcę podawać</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <input
              id={`child-${index}-special-needs`}
              type="checkbox"
              checked={childData.specialNeeds || false}
              onChange={(e) => handleChange("specialNeeds", e.target.checked)}
              className="mt-1"
            />
            <Label htmlFor={`child-${index}-special-needs`} className="text-sm">
              Dziecko ma szczególne potrzeby (np. wynikające z
              niepełnosprawności, przewlekłej choroby)
            </Label>
          </div>

          {childData.specialNeeds && (
            <div className="mt-2">
              <Label
                htmlFor={`child-${index}-special-needs-desc`}
                className="text-sm font-medium"
              >
                Krótki opis szczególnych potrzeb
              </Label>
              <Textarea
                id={`child-${index}-special-needs-desc`}
                value={childData.specialNeedsDesc || ""}
                onChange={(e) =>
                  handleChange("specialNeedsDesc", e.target.value)
                }
                placeholder="Opisz szczególne potrzeby dziecka"
                className="mt-1"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Give the component a display name to help with debugging
ChildForm.displayName = "ChildForm";

export default function Step5Page() {
  const { formData, updateFormData, validateCurrentStep } = useFormContext();
  const [childrenCount, setChildrenCount] = useState<number>(
    formData.childrenCount || 1
  );
  const [childrenData, setChildrenData] = useState<any[]>(
    formData.children || [{}]
  );
  const [isFormValid, setIsFormValid] = useState(false);

  // Update children forms when count changes - tylko raz przy zmianie liczby dzieci
  useEffect(() => {
    if (childrenCount > childrenData.length) {
      // Add new child forms
      const newChildrenData = [...childrenData];
      for (let i = childrenData.length; i < childrenCount; i++) {
        newChildrenData.push({});
      }
      setChildrenData(newChildrenData);
    } else if (childrenCount < childrenData.length) {
      // Remove excess child forms
      setChildrenData(childrenData.slice(0, childrenCount));
    }
  }, [childrenCount, childrenData.length]); // zmieniono by używać tylko length zamiast całego obiektu

  // Save form data - wykonywane rzadziej dzięki useCallback
  const updateFormDataCallback = useCallback(() => {
    updateFormData({
      childrenCount,
      children: childrenData,
    });
    // Po aktualizacji sprawdzamy czy formularz jest poprawny
    setIsFormValid(validateCurrentStep());
  }, [childrenCount, childrenData, updateFormData, validateCurrentStep]);

  // Używamy jednego efektu do aktualizacji danych
  useEffect(() => {
    // Używamy setTimeout, aby uniknąć zbyt częstych aktualizacji
    const timeoutId = setTimeout(() => {
      updateFormDataCallback();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [updateFormDataCallback]);

  const handleChildrenCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(e.target.value);
    if (count >= 1 && count <= 10) {
      setChildrenCount(count);
    }
  };

  const handleChildDataChange = useCallback((index: number, data: any) => {
    setChildrenData((prev) => {
      const newChildrenData = [...prev];
      newChildrenData[index] = data;
      return newChildrenData;
    });
  }, []);

  return (
    <FormLayout title="Informacje o dzieciach">
      <div className="space-y-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="children-count" className="font-medium">
                    Ile masz dzieci z drugim rodzicem?
                    <InfoTooltip text="Podaj liczbę dzieci, których dotyczy sprawa alimentacyjna." />
                  </Label>
                </div>

                <Input
                  id="children-count"
                  type="number"
                  min="1"
                  max="10"
                  value={childrenCount}
                  onChange={handleChildrenCountChange}
                  className="w-32"
                />
              </div>{" "}
              <div id="children-forms" className="space-y-6 mt-4">
                {useMemo(() => {
                  return Array.from({ length: childrenCount }).map(
                    (_, index) => (
                      <ChildForm
                        key={`child-${index}`}
                        index={index}
                        childData={childrenData[index] || {}}
                        onChange={handleChildDataChange}
                      />
                    )
                  );
                }, [childrenCount, childrenData, handleChildDataChange])}
              </div>{" "}
              <div className="mt-6 flex gap-3">
                <Link href="/formularz/krok-4" passHref>
                  <Button variant="outline" className="flex-1">
                    Wstecz
                  </Button>
                </Link>
                {useMemo(() => {
                  return isFormValid ? (
                    <Link href="/formularz/krok-6" passHref>
                      <Button className="flex-1">Dalej</Button>
                    </Link>
                  ) : (
                    <Button className="flex-1" disabled>
                      Dalej
                    </Button>
                  );
                }, [isFormValid])}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormLayout>
  );
}
