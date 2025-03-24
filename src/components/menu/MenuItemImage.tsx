import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItemImageProps {
  imageUrl?: string;
  onImageChange: (imageUrl: string) => void;
  onImageRemove: () => void;
}

export function MenuItemImage({ imageUrl, onImageChange, onImageRemove }: MenuItemImageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageChange(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    
    // In a real application, you would upload the image to a server here
    // and then set the returned URL as the image source
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="item-image">Item Image</Label>
        {previewUrl && (
          <Button 
            type="button" 
            variant="destructive" 
            size="sm"
            onClick={() => {
              setPreviewUrl(undefined);
              onImageRemove();
            }}
          >
            Remove Image
          </Button>
        )}
      </div>
      
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Menu item" 
            className="w-full h-48 object-cover rounded-md"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
              <p className="text-white">Uploading...</p>
            </div>
          )}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-48 p-6">
            <p className="text-sm text-gray-500 mb-4">Upload an image for this menu item</p>
            <Input
              id="item-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="max-w-xs"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
