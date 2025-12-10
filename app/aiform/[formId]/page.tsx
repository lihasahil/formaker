/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FormSchema } from "@/app/types/form-types";
import { getPublicFormCaller } from "@/app/actions/get-public-form";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createUserResponse } from "@/app/actions/submit-form-response";

export default function LiveAiForm() {
  const params = useParams();
  const formId = params.formId as string;
  const router = useRouter();
  const [formSchema, setFormSchema] = useState<FormSchema>();
  const [loading, setLoading] = useState(true);
  const [selectedGradient, setSelectedGradient] = useState<string>("#ffffff");
  const [borderWidth, setBorderWidth] = useState<number>(2);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      try {
        const res = await getPublicFormCaller(Number(formId));

        let jsonString = res.jsonform;

        if (typeof jsonString === "string") {
          jsonString = jsonString
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "");
        }

        const parsedJson =
          typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;

        setFormSchema(parsedJson);
        setBorderWidth(res.borderWidth);
        setSelectedGradient(res.background);
        toast.success("Form loaded!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load form"
        );
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId]);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formSchema) return;

    const missingRequired = formSchema.fields.filter(
      (field) => field.required && !formData[field.name]
    );

    if (missingRequired.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await createUserResponse(formData, Number(formId));

      if (!response.success) {
        toast.error(response.error || "Failed to submit form");
        return;
      }

      toast.success("Form submitted successfully!");
      router.push(`/`);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const renderField = (field: any) => {
    const baseClasses =
      "w-full px-3 py-2 border border-gray-300 text-black placeholder:text-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

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
            className={`${baseClasses} appearance-none cursor-pointer text-black bg-white`}
            size={1}
          >
            <option value="">Select an option</option>
            {field.options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((opt: any) => (
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
                <span className="text-gray-800">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((opt: any) => (
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
                <span className="text-gray-800">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-center relative flex-col">
        {loading ? (
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            <Image
              src="/logo/form.svg"
              alt="Form"
              width={150}
              height={150}
              style={{ animation: "fadeInOut 2s ease-in-out infinite" }}
            />
            <p className="text-base text-gray-600 mt-4">Loading form...</p>

            <style jsx>{`
              @keyframes fadeInOut {
                0%,
                100% {
                  opacity: 0;
                }
                50% {
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        ) : formSchema ? (
          <>
            <div
              className="w-full max-w-3xl border p-5 relative flex flex-col items-center"
              style={{
                background: selectedGradient,
                border: `${borderWidth}px solid #000000`,
                borderRadius: "0.5rem",
              }}
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-black mb-2">
                  {formSchema.formTitle ?? formSchema.title}
                </h1>
                <p className="text-gray-600">
                  {formSchema.formSubtitle ?? formSchema.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                {formSchema.fields.map((field: any, idx: number) => (
                  <div key={idx} className="space-y-2">
                    <label className="block font-medium text-gray-700">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {renderField(field)}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition mt-8"
                >
                  Submit Form
                </button>
              </form>
            </div>

            <Link href={"/"}>
              <Button
                variant="brutalDown"
                className="bg-white flex gap-2 items-center cursor-pointer rounded-md border-2 text-sm  mt-4 sm:absolute sm:left-0 sm:bottom-0"
              >
                <Image src="/logo/logo.svg" alt="Form" width={30} height={30} />
                Create your form
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-lg text-gray-600">No form data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
