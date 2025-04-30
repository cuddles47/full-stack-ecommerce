"use client";

import { useState } from "react";
import Input from "@/shared/components/UI/input";
import Button from "@/shared/components/UI/button";
import Popup from "@/shared/components/UI/popup";
import { addCategory } from "@/actions/category/category";

interface Props {
  onReset: () => void;
}

export default function AddCategoryGroup({ onReset }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name) return;
    setLoading(true);
    const response = await addCategory({ parentID: null, name, url: name.toLowerCase(), iconUrl: null, iconSize: [24,24] });
    setLoading(false);
    setShowPopup(false);
    setName("");
    onReset();
  };

  return (
    <> 
      <Button onClick={() => setShowPopup(true)}>Add Group</Button>
      {showPopup && (
        <Popup
          title="New Category Group"
          content={
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Group Name"
              />
            </div>
          }
          isLoading={loading}
          onCancel={() => setShowPopup(false)}
          onClose={() => setShowPopup(false)}
          onSubmit={handleAdd}
          confirmBtnText="Add"
        />
      )}
    </>
  );
}