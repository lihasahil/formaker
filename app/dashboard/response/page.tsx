"use client";

import { useEffect, useState } from "react";
import { getFormsByCreator } from "@/app/actions/get-form-list";
import { useUser } from "@clerk/nextjs";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Image from "next/image";

interface Form {
  id: number;
  jsonform: string;
  createdBy: string;
  createdAt: Date;
  background: string;
  borderWidth: number;
  _count: { responses: number };
  responses: { id: number; jsonResponse: string; createdAt: Date }[];
}

export default function Responses() {
  const { user } = useUser();
  const createdBy = user?.primaryEmailAddress?.emailAddress;
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !createdBy) return;

    const fetchForms = async () => {
      setLoading(true);
      const res = await getFormsByCreator(createdBy);
      if (res.success) {
        setForms((res.data as Form[]) || []);
      } else {
        setForms([]);
        console.error(res.error);
      }
      setLoading(false);
    };

    fetchForms();
  }, [user, createdBy]);

  // Download responses as Excel
  const handleDownload = async (form: Form) => {
    if (!form.responses || form.responses.length === 0) {
      alert("No responses to download!");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Responses");

    const data = form.responses.map((r) => JSON.parse(r.jsonResponse));

    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);
      data.forEach((row) => {
        worksheet.addRow(headers.map((h) => row[h]));
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${form.id}_responses.xlsx`);
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <Image
          src="/logo/form.svg"
          alt="Form"
          width={150}
          height={150}
          style={{ animation: "fadeInOut 2s ease-in-out infinite" }}
        />
        <p className="text-base text-gray-600 mt-4">Loading Response...</p>

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

  if (forms.length === 0)
    return <div className="text-center mt-20 text-lg">No forms created</div>;

  return (
    <div className="p-10">
      <h2 className="text-black flex justify-between font-bold text-2xl">
        Response
      </h2>
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form) => {
          let parsedForm;
          try {
            let cleanJson = form.jsonform.trim();
            if (cleanJson.startsWith("```json")) {
              cleanJson = cleanJson
                .replace(/^```json\n?/, "")
                .replace(/\n?```$/, "");
            } else if (cleanJson.startsWith("```")) {
              cleanJson = cleanJson
                .replace(/^```\n?/, "")
                .replace(/\n?```$/, "");
            }
            parsedForm = JSON.parse(cleanJson);
          } catch {
            parsedForm = { formTitle: "Untitled Form", formSubtitle: "" };
          }

          const formTitle =
            parsedForm?.formTitle || parsedForm.title || "Untitled Form";
          const formSubtitle =
            parsedForm?.formSubtitle || parsedForm.subtitle || "";

          return (
            <Card
              variant="shadow"
              key={form.id}
              className="p-4 rounded-md bg-background flex flex-col"
            >
              <div className="flex-1 space-y-4">
                <h2 className="text-xl font-bold">{formTitle}</h2>
                <p className="text-gray-600 text-sm">{formSubtitle}</p>
              </div>

              <CardFooter className="flex gap-4 justify-between items-center pt-4 px-0">
                <p className="text-gray-500 text-sm">
                  Response Count: {form._count.responses}
                </p>
                <Button
                  variant="brutalUp"
                  className="flex items-center bg-background gap-1 disabled:cursor-pointer"
                  onClick={() => handleDownload(form)}
                  disabled={form._count.responses === 0}
                >
                  <Download size={16} />
                  Download
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
