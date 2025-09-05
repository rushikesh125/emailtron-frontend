"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadResult, setUploadResult] = useState(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);

  // Memoize handleSubmit to prevent re-creation on renders
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!file || isUploading) return; // Prevent submission if no file or already uploading

      setIsUploading(true);
      setUploadStatus("idle");
      setUploadResult(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.uid);

      try {
        console.log(`[${new Date().toISOString()}] Sending upload request for userId=${user.uid}`);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (response.ok) {
          setUploadStatus("success");
          setUploadResult(result);
        } else {
          setUploadStatus("error");
          setUploadResult(result);
        }
      } catch (error) {
        setUploadStatus("error");
        setUploadResult({ error: "Network error occurred" });
      } finally {
        setIsUploading(false);
      }
    },
    [file, isUploading, user.uid] // Dependencies for useCallback
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
      setUploadStatus("idle");
      setUploadResult(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
      setUploadStatus("idle");
      setUploadResult(null);
    }
  };

  const isValidFile = (file) => {
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    return validTypes.includes(file.type);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click(); // Corrected from FilipeInputRef
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.name.endsWith(".csv"))
      return <FileText className="h-5 w-5 text-green-500" />;
    return <FileText className="h-5 w-5 text-blue-500" />;
  };

  const renderResult = () => {
    if (!uploadResult) return null;

    if (uploadStatus === "success") {
      return (
        <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Upload Successful!</span>
          </div>
          <p className="text-sm text-green-700">
            {uploadResult.message} ({uploadResult.count} records)
          </p>

          {uploadResult.errors && uploadResult.errors.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <Info className="h-4 w-4" />
                <span className="text-xs font-medium">
                  Some rows had issues:
                </span>
              </div>
              <ul className="text-xs text-amber-700 max-h-32 overflow-y-auto">
                {uploadResult.errors.slice(0, 5).map((err, index) => (
                  <li key={index} className="mb-1">
                    Row: {JSON.stringify(err.row)} - {err.error}
                  </li>
                ))}
                {uploadResult.errors.length > 5 && (
                  <li className="font-medium">
                    ...and {uploadResult.errors.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      );
    }

    if (uploadStatus === "error") {
      return (
        <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Upload Failed</span>
          </div>
          <p className="text-sm text-red-700">
            {uploadResult.error || "An error occurred during upload"}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-theme-purple">
            Data Upload
          </CardTitle>
          <CardDescription>Upload your CSV or Excel files</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                isDragging
                  ? "border-theme-purple bg-theme-purple/10"
                  : "border-theme-purple/30 hover:border-theme-purple/50",
                file && "border-theme-purple/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
              />

              <div className="flex flex-col items-center justify-center gap-3">
                <Upload className="h-10 w-10 text-theme-purple/70" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {file ? file.name : "Click to upload or drag file"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CSV, XLS, XLSX files only
                  </p>
                </div>

                {file && (
                  <div className="flex items-center gap-2 mt-2">
                    {getFileIcon()}
                    <span className="text-sm truncate max-w-[200px]">
                      {file.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {renderResult()}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-theme-purple hover:bg-theme-purple/90 text-white"
              disabled={!file || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-theme-purple text-theme-purple hover:bg-theme-purple/10"
              onClick={() => {
                setFile(null);
                setUploadStatus("idle");
                setUploadResult(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
            >
              Clear Selection
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}