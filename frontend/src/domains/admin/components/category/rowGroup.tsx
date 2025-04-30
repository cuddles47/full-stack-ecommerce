"use client";

import { useState } from "react";
import Input from "@/shared/components/UI/input";
import Button from "@/shared/components/UI/button";
import Popup from "@/shared/components/UI/popup";
import { TCategory } from "@/shared/types/categories";
import { addCategory, updateCategory, deleteCategory } from "@/actions/category/category";

interface Props {
  onReset: () => void;
  data: TCategory;
  categories: TCategory[];
}

export default function CatGroupRow({ onReset, data, categories }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState(data.name);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await updateCategory({ ...data, name: editName });
    setLoading(false);
    setShowEdit(false);
    onReset();
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteCategory(data.id);
    setLoading(false);
    onReset();
  };

  const subcats = categories.filter((cat) => cat.parentID === data.id);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium">{data.name}</h4>
        <div className="flex gap-2">
          <Button onClick={() => setShowEdit(true)}>Edit Group</Button>
          <Button onClick={() => setShowDelete(true)} className="text-red-600">Delete Group</Button>
        </div>
      </div>
      <div className="pl-4">
        {subcats.map((cat) => (
          <div key={cat.id} className="flex justify-between items-center py-1">
            <span>{cat.name}</span>
            {/* could add edit/delete for subcategories here */}
          </div>
        ))}
      </div>
      {showEdit && (
        <Popup
          title="Edit Category Group"
          content={
            <div className="flex gap-2">
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
          }
          isLoading={loading}
          onCancel={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
          onSubmit={handleUpdate}
        />
      )}
      {showDelete && (
        <Popup
          title="Confirm Delete"
          content={<div>Delete group "{data.name}"?</div>}
          isLoading={loading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={handleDelete}
        />
      )}
    </div>
  );
}