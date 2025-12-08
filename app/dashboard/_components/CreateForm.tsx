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
import { useState } from "react";

const PROMPT =
  ", On the basis of description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldType, field required In Json format";

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUsrInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

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
        alert("Form created successfully!");
      }

      setOpenDialog(false);
      setUsrInput("");
    } catch (error) {
      console.error("Error generating form:", error);
      alert(
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
