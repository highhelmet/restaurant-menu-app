import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDropzone } from 'react-dropzone';

interface ImageManagerProps {
  initialImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  itemName: string;
}

export function ImageManager({ initialImage, onImageChange, itemName }: ImageManagerProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      onImageChange(result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': []
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Item Image</h3>
          {image && (
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={handleRemoveImage}
            >
              Remove Image
            </Button>
          )}
        </div>
        
        {image ? (
          <div className="relative">
            <img 
              src={image} 
              alt={itemName || "Menu item"} 
              className="w-full h-48 object-cover rounded-md"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                <p className="text-white">Uploading...</p>
              </div>
            )}
          </div>
        ) : (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-48 cursor-pointer ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-sm text-center">Drop the image here...</p>
            ) : (
              <>
                <p className="text-sm text-center mb-2">Drag & drop an image here, or click to select</p>
                <p className="text-xs text-gray-500 text-center">
                  Supported formats: JPG, PNG, GIF, WebP (max 5MB)
                </p>
              </>
            )}
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        
        <div className="text-sm text-gray-500">
          <p>Images will be displayed alongside menu items and included in exported menus.</p>
        </div>
      </CardContent>
    </Card>
  );
}
