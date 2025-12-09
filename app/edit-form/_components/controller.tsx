"use client";

import React from "react";

import { FormSchema } from "@/app/types/form-types";
import { Button } from "@/components/ui/button";

interface FormControllerProps {
  schema?: FormSchema;
  editable?: boolean;
}

interface FormControllerProps {
  selectedGradient: string;
  setSelectedGradient: (val: string) => void;
  borderWidth: number;
  setBorderWidth: (val: number) => void;
  schema?: FormSchema;
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
  selectedGradient,
  setSelectedGradient,
  borderWidth,
  setBorderWidth,
}) => {
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
              className={`w-20 h-12 rounded-md cursor-pointer border-black  ${
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
    </div>
  );
};

export default FormController;
