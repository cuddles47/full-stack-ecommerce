"use client";

import { TProductListItem } from "@/shared/types/product";
import Button from "@/shared/components/UI/button";
import { deleteProduct } from "@/actions/product/product";

interface Props {
  data: TProductListItem;
  requestReload: () => void;
}

export default function ProductListItem({ data, requestReload }: Props) {
  const handleDelete = async () => {
    const result = await deleteProduct(data.id);
    if (result.res) requestReload();
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <span>{data.name}</span>
      <Button onClick={handleDelete} className="text-red-500">
        Delete
      </Button>
    </div>
  );
}