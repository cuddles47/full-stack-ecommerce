"use client";

import { TAddProductFormValues } from "@/shared/types/product";
import Input from "@/shared/components/UI/input";
import Button from "@/shared/components/UI/button";

interface Props {
  formValues: TAddProductFormValues;
  onChange: (values: TAddProductFormValues) => void;
}

export default function ProductForm({ formValues, onChange }: Props) {
  const handleField = (key: keyof TAddProductFormValues, value: any) => {
    onChange({ ...formValues, [key]: value });
  };

  return (
    <form className="flex flex-col gap-4">
      <Input
        type="text"
        value={formValues.name}
        onChange={(e) => handleField('name', e.target.value)}
        placeholder="Name"
      />
      <Input
        type="text"
        value={formValues.price}
        onChange={(e) => handleField('price', e.target.value)}
        placeholder="Price"
      />
      {/* Add additional fields similarly... */}
    </form>
  );
}