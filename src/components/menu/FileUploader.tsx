"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploaderProps {
  onFilesAccepted: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
}

export function FileUploader({
  onFilesAccepted,
  acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'],
  maxFiles = 5
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles
  });

  return (
    <div className="w-full">
      <Card 
        {...getRootProps()} 
        className={`p-8 border-2 border-dashed cursor-pointer flex flex-col items-center justify-center min-h-[200px] ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="text-lg font-medium">Drop the files here...</p>
          ) : (
            <>
              <p className="text-lg font-medium mb-2">Drag & drop menu files here, or click to select files</p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, JPG, PNG
              </p>
            </>
          )}
        </div>
      </Card>

      {acceptedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Uploaded files:</h3>
          <ul className="space-y-2">
            {acceptedFiles.map((file, index) => (
              <li key={index} className="text-sm p-2 bg-gray-50 rounded flex justify-between items-center">
                <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
