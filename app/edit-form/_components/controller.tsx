"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateFormStyle } from "@/app/actions/updte-form-style";

interface FormControllerProps {
  formId: number;
  user: string;
  selectedGradient: string;
  setSelectedGradient: (val: string) => void;
  borderWidth: number;
  setBorderWidth: (val: number) => void;
}

const gradients = [
  "#ffffff",
  "#F7F7F7",
  "#F3F4F6",
  "#F2F4F7",
  "#E7F0FF",
  "#E9FBEA",
  "#F4EDFF",
  "#FFF2E8",
  "#E8FFF8",
  "#FFFCE5",
  "#E6FAF9",
  "#FFEFF2",
];

const borders = [1, 2, 3, 4, 5];

const FormController: React.FC<FormControllerProps> = ({
  formId,
  user,
  selectedGradient,
  setSelectedGradient,
  borderWidth,
  setBorderWidth,
}) => {
  const [loading, setLoading] = useState(false);

  const handleApplyChanges = async () => {
    setLoading(true);
    try {
      const res = await updateFormStyle({
        id: formId,
        background: selectedGradient,
        borderWidth,
        updatedBy: user,
      });

      if (res.success) {
        toast.success("Form style updated successfully!");
      } else {
        toast.error(res.error || "Failed to update form style");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">Form Style Controller</h2>

      {/* Gradient Picker */}
      <div>
        <p className="text-sm font-medium mb-4">Select Background Color:</p>
        <div className="grid gap-2 grid-cols-4 flex-wrap">
          {gradients.map((grad, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedGradient(grad)}
              className={`w-20 h-12 rounded-md cursor-pointer border-black ${
                selectedGradient === grad ? "border-4" : "border-2"
              }`}
              style={{ background: grad }}
            />
          ))}
        </div>
      </div>

      {/* Border Thickness Picker */}
      <div>
        <p className="text-sm font-medium mb-2">Select Border Thickness:</p>
        <div className="flex gap-2">
          {borders.map((b, idx) => (
            <Button
              key={idx}
              onClick={() => setBorderWidth(b)}
              className={`px-3 py-1 rounded-md border hover:bg-gray-300 ${
                borderWidth === b
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {b}px
            </Button>
          ))}
        </div>
      </div>

      {/* Apply Changes Button */}
      <Button
        variant="brutalUp"
        className="rounded-md bg-background hover:shadow-yellow-400"
        onClick={handleApplyChanges}
        disabled={loading}
      >
        {loading ? "Saving..." : "Apply Changes"}
      </Button>
    </div>
  );
};

export default FormController;
