"use client";

import { getFormCaller } from "@/app/actions/get-form";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, Share } from "lucide-react";
import { Card } from "@/components/ui/card";
import FormUi from "../_components/formui";
import { FormSchema } from "@/app/types/form-types";
import { updateJsonForm } from "@/app/actions/update-form";
import FormController from "../_components/controller";
import Link from "next/link";

export default function EditFormPage() {
  const params = useParams();
  const formId = params.formId as string;
  const { user, isLoaded } = useUser();
  const [formSchema, setFormSchema] = useState<FormSchema>();
  const [loading, setLoading] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState<string>("#ffffff");
  const [borderWidth, setBorderWidth] = useState<number>(2);

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      try {
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        const res = await getFormCaller(Number(formId), userEmail || "");

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

    fetchForm();
  }, [isLoaded, user, formId]);

  const handleSchemaChange = async (updatedSchema: FormSchema) => {
    setFormSchema(updatedSchema);
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const res = await updateJsonForm(Number(formId), updatedSchema, userEmail!);

    if (res.success) {
      toast.success("Field updated!");
    } else {
      toast.error("Failed to update form");
    }
  };

  return (
    <div className="text-black p-6">
      <div className="flex justify-between">
        <Button variant="brutalDown" className="rounded-md bg-background  mb-4">
          <ChevronLeft />
          Back
        </Button>
        <div className="flex items-center gap-4">
          <Link href={"/aiform/" + formId} target="_blank">
            <Button
              variant="brutalDown"
              className="rounded-md bg-background  mb-4"
            >
              <Eye />
              Live Preview
            </Button>
          </Link>

          <Button
            variant="brutalDown"
            className="rounded-md bg-background  mb-4"
          >
            <Share />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Controller */}
        <Card variant="shadow" className="rounded-md h-fit p-5 bg-background">
          <FormController
            selectedGradient={selectedGradient}
            setSelectedGradient={setSelectedGradient}
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            formId={Number(formId)}
            user={user?.primaryEmailAddress?.emailAddress || ""}
          />
        </Card>

        {/* Form */}
        <Card
          variant="shadow"
          className="md:col-span-2 rounded-md p-4 h-fit bg-background"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading form...</p>
            </div>
          ) : formSchema ? (
            <FormUi
              schema={formSchema}
              onSchemaChange={handleSchemaChange}
              editable={true}
              background={selectedGradient}
              borderWidth={borderWidth}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No form data</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
