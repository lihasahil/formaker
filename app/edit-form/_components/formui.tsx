/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FormSchema, FormField, FormOption } from "@/app/types/form-types";
import { Trash2, Edit2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormUiProps {
  schema?: FormSchema;
  onSchemaChange?: (schema: FormSchema) => void;
  editable?: boolean;
  background?: string;
  borderWidth?: number;
}

function FormUi({
  schema,
  onSchemaChange,
  editable = false,
  background = "#ffffff",
  borderWidth = 2,
}: FormUiProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>({});
  const [editingField, setEditingField] = React.useState<number | null>(null);
  const [editingData, setEditingData] = React.useState<FormField | null>(null);
  const [deleteIndex, setDeleteIndex] = React.useState<number | null>(null);

  if (!schema)
    return <div className="text-center py-8">No schema provided</div>;

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleStartEdit = (index: number) => {
    setEditingField(index);
    setEditingData({ ...schema.fields[index] });
  };

  const handleSaveEdit = () => {
    if (editingField !== null && editingData) {
      const updatedFields = [...schema.fields];
      updatedFields[editingField] = editingData;

      const updatedSchema = {
        ...schema,
        fields: updatedFields,
      };

      console.log("Saving updated schema:", updatedSchema);

      if (onSchemaChange) {
        onSchemaChange(updatedSchema);
      } else {
        console.warn("onSchemaChange callback not provided");
      }

      setEditingField(null);
      setEditingData(null);
    } else {
      console.log("Cannot save:", {
        editingField,
        editingData,
        hasCallback: !!onSchemaChange,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditingData(null);
  };
  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleDeleteField = () => {
    if (deleteIndex !== null && onSchemaChange) {
      const updatedFields = schema.fields.filter((_, i) => i !== deleteIndex);
      onSchemaChange({
        ...schema,
        fields: updatedFields,
      });
      setDeleteIndex(null);
    }
  };

  const handleEditFieldChange = (key: keyof FormField, value: any) => {
    if (editingData) {
      const updates: any = { [key]: value };

      if (key === "label") {
        updates.name = value
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");
      }

      setEditingData({
        ...editingData,
        ...updates,
      });
    }
  };

  const handleOptionChange = (
    optionIndex: number,
    key: keyof FormOption,
    value: string
  ) => {
    if (editingData && editingData.options) {
      const updatedOptions = [...editingData.options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [key]: value,
      };
      setEditingData({
        ...editingData,
        options: updatedOptions,
      });
    }
  };

  const handleAddOption = () => {
    if (editingData) {
      const options = editingData.options || [];
      setEditingData({
        ...editingData,
        options: [
          ...options,
          { value: `option_${options.length + 1}`, label: "" },
        ],
      });
    }
  };

  const handleDeleteOption = (optionIndex: number) => {
    if (editingData && editingData.options) {
      const updatedOptions = editingData.options.filter(
        (_, i) => i !== optionIndex
      );
      setEditingData({
        ...editingData,
        options: updatedOptions,
      });
    }
  };

  const renderField = (field: FormField) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || ""}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={baseClasses}
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || ""}
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            rows={4}
            className={baseClasses}
          />
        );

      case "select":
        return (
          <select
            value={formData[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className={`${baseClasses} appearance-none cursor-pointer bg-white`}
            size={1}
          >
            {field.options?.map((opt: FormOption) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((opt: FormOption) => (
              <label
                key={opt.value}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={formData[field.name] === opt.value}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value)
                  }
                  required={field.required}
                  className="mr-3"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((opt: FormOption) => (
              <label
                key={opt.value}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={(formData[field.name] || []).includes(opt.value)}
                  onChange={(e) => {
                    const current = formData[field.name] || [];
                    const updated = e.target.checked
                      ? [...current, opt.value]
                      : current.filter((item: string) => item !== opt.value);
                    handleInputChange(field.name, updated);
                  }}
                  required={field.required}
                  className="mr-3"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <>
      <div
        className="w-full max-w-3xl border p-5 mx-auto"
        style={{
          background,
          border: `${borderWidth}px solid #000000`,
          borderRadius: "0.5rem",
        }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            {schema.formTitle ?? schema.title}
          </h1>
          <p className="text-gray-600 text-center">
            {schema.formSubtitle ?? schema.subtitle}
          </p>
        </div>

        <div onSubmit={handleSubmit} className="space-y-6">
          {schema.fields.map((field: FormField, idx: number) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <label className="block font-medium text-gray-700 flex-1">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {editable && (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(idx)}
                      className="p-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded-md transition"
                      title="Edit field"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteIndex(idx)}
                      className="p-2 text-red-500 cursor-pointer hover:bg-red-50 rounded-md transition"
                      title="Delete field"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              {renderField(field)}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition mt-8"
          >
            Submit Form
          </button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={editingField !== null}
        onOpenChange={(open) => !open && handleCancelEdit()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] bg-background overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>Edit Field</DialogTitle>
          </DialogHeader>

          {editingData && (
            <div className="space-y-4 py-4">
              {/* Field Label */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Field Label</label>
                <Input
                  value={editingData.label}
                  onChange={(e) =>
                    handleEditFieldChange("label", e.target.value)
                  }
                />
              </div>

              {/* Field Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Field Name (ID)</label>
                <Input
                  value={editingData.name}
                  onChange={(e) =>
                    handleEditFieldChange("name", e.target.value)
                  }
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generated from label
                </p>
              </div>

              {/* Placeholder */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Placeholder</label>
                <Input
                  value={editingData.placeholder || ""}
                  onChange={(e) =>
                    handleEditFieldChange("placeholder", e.target.value)
                  }
                />
              </div>

              {/* Field Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Field Type</label>

                <Select
                  value={editingData.type}
                  onValueChange={(value) =>
                    handleEditFieldChange("type", value as FormField["type"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="radio">Radio</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Required Checkbox */}
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={editingData.required || false}
                  onCheckedChange={(checked) =>
                    handleEditFieldChange("required", checked)
                  }
                />
                <label className="text-sm font-medium">Required field</label>
              </div>

              {/* Options for select/radio/checkbox */}
              {(editingData.type === "select" ||
                editingData.type === "radio" ||
                editingData.type === "checkbox") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Options</label>

                  {editingData.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={option.value}
                        onChange={(e) =>
                          handleOptionChange(idx, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Input
                        value={option.label}
                        onChange={(e) =>
                          handleOptionChange(idx, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="flex-1"
                      />

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteOption(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="brutalUp"
                    className="mt-4 rounded-md bg-background"
                    onClick={handleAddOption}
                  >
                    <Plus size={16} className="mr-2 " />
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="brutalDown"
              className="bg-destructive rounded-md"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              variant="brutalDown"
              onClick={handleSaveEdit}
              className="rounded-md"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteIndex !== null}
        onOpenChange={(open) => !open && setDeleteIndex(null)}
      >
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the field
              {deleteIndex !== null ? schema.fields[deleteIndex]?.label : ""}.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="brutalDown"
              className="bg-background"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
            <Button
              variant="brutalDown"
              className="bg-destructive"
              onClick={handleDeleteField}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormUi;
