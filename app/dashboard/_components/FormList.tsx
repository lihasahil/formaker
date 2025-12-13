"use client";

import { useEffect, useState } from "react";
import { getFormsByCreator } from "@/app/actions/get-form-list";
import { useUser } from "@clerk/nextjs";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RWebShare } from "react-web-share";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteForm } from "@/app/actions/delete-form";
import { toast } from "sonner";

interface Form {
  id: number;
  jsonform: string;
  createdBy: string;
  createdAt: Date;
  background: string;
  borderWidth: number;
}

export default function FormList() {
  const { user } = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress;
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user || !createdBy) return;

    const fetchForms = async () => {
      setLoading(true);
      const res = await getFormsByCreator(createdBy);
      if (res.success) {
        setForms(res.data!);
      } else {
        setForms([]);
        console.error(res.error);
      }
      setLoading(false);
    };

    fetchForms();
  }, [user, createdBy]);

  const handleDeleteConfirm = async () => {
    if (!deleteIndex) return;

    const id = deleteIndex;

    setDeleteIndex(null);

    const res = await deleteForm(id);

    if (res.success) {
      setForms((prev) => prev.filter((f) => f.id !== id));
      toast.success("Form deleted successfully!");
    } else {
      toast.error(res.error);
    }
  };

  const handleCancel = () => {
    setDeleteIndex(null);
  };

  if (loading) {
    return (
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
    );
  }

  if (forms.length == 0) {
    return (
      <div className="flex items-center justify-center h-64 text-black font-bold text-2xl">
        No forms created
      </div>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
      {forms.map((form: Form) => {
        let parsedForm;
        try {
          let cleanJson = form.jsonform.trim();
          if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson
              .replace(/^```json\n?/, "")
              .replace(/\n?```$/, "");
          } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.replace(/^```\n?/, "").replace(/\n?```$/, "");
          }
          parsedForm = JSON.parse(cleanJson);
        } catch (error) {
          console.error(`Failed to parse form ${form.id}:`, error);
          parsedForm = { formTitle: "Untitled Form", formSubtitle: "" };
        }

        const formTitle =
          parsedForm?.formTitle || parsedForm?.title || "Untitled Form";
        const formSubtitle =
          parsedForm?.formSubtitle || parsedForm?.subtitle || "";

        return (
          <Card
            variant="shadow"
            key={form.id}
            className="p-4 rounded-md bg-background flex flex-col"
          >
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-bold">{formTitle}</h2>
              <p className="text-gray-600 text-sm">{formSubtitle}</p>
              <p className="text-gray-500 text-xs">
                Created at: {new Date(form.createdAt).toLocaleString()}
              </p>
            </div>

            <CardFooter className="flex gap-4 justify-between items-center pt-4 px-0">
              <RWebShare
                data={{
                  text: formTitle + " Made with Formaker",
                  url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + form.id,
                  title: formTitle,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button
                  variant="brutalUp"
                  className="rounded-md bg-background flex items-center gap-1"
                >
                  Share
                </Button>
              </RWebShare>

              <div className="flex gap-4 justify-end">
                <Link href={`/edit-form/${form.id}`}>
                  <Button
                    variant="brutalUp"
                    className="rounded-md bg-background flex items-center gap-1"
                  >
                    <Edit size={16} />
                  </Button>
                </Link>
                <Button
                  variant="brutalUp"
                  className="rounded-md bg-background flex items-center gap-1"
                  onClick={() => setDeleteIndex(form.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
      <Dialog
        open={deleteIndex !== null}
        onOpenChange={(open) => !open && setDeleteIndex(null)}
      >
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the form This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="brutalDown"
              className="bg-background"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="brutalDown"
              className="bg-destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
