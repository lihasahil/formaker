"use client";

import { callGeminiAI } from "@/app/actions/ai-model";
import { createFormAction } from "@/app/actions/create-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const PROMPT =
  ",Based on descriptionprovide a JSON representation of a simple form containing multiple fields and form title and subtitle in compulsary based on description on any language. the form title and subtitle is compulsary. For each field, include the following details: name (the field’s identifier), label (the text label displayed to the user), placeholder (placeholder text if applicable), type (input type such as text, email, number, password, select, checkbox, radio, or textarea), required (true or false), options (an array of values and labels if the field is a select, checkbox, or radio). Generate at least five fields demonstrating a variety of input types including text, email, number, select, checkbox, radio, and textarea. Provide the output in a clean JSON format suitable for further processing or use in form generation.";
function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUsrInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    if (!userInput.trim()) {
      alert("Please enter a form description");
      return;
    }

    setLoading(true);
    try {
      console.log("Starting form generation...");
      const response = await callGeminiAI("Description:" + userInput + PROMPT);
      console.log("AI Response:", response);

      if (response) {
        const res = await createFormAction({
          jsonForm: response,
          createdBy: user?.primaryEmailAddress?.emailAddress || "",
        });
        console.log("Form created:", res);
        toast.success("Form created successfully!");

        if (res.id) {
          route.push("/edit-form/" + res.id);
        }
      }

      setOpenDialog(false);
      setUsrInput("");
    } catch (error) {
      console.error("Error generating form:", error);
      toast.error(
        `Failed to generate form: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenDialog(true)}
        variant="brutalUp"
        className="bg-background text-black rounded-md"
      >
        Create Form
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(e) => setUsrInput(e.target.value)}
                className="bg-background my-2"
                rows={6}
                placeholder="Write description of your form"
                disabled={loading}
                value={userInput}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setOpenDialog(false);
                setUsrInput("");
              }}
              variant="brutalDown"
              className="rounded-md bg-red-400"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={onCreateForm}
              variant="brutalDown"
              className="rounded-md"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
