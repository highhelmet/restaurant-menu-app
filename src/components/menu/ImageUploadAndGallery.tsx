import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageManager } from '@/components/menu/ImageManager';

interface ImageGalleryProps {
  images: string[];
  onImageSelect: (imageUrl: string) => void;
}

export function ImageGallery({ images, onImageSelect }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="relative cursor-pointer border rounded-md overflow-hidden hover:opacity-90 transition-opacity"
          onClick={() => onImageSelect(image)}
        >
          <img 
            src={image} 
            alt={`Gallery image ${index + 1}`} 
            className="w-full h-32 object-cover"
          />
        </div>
      ))}
      {images.length === 0 && (
        <p className="text-sm text-gray-500 col-span-3 text-center py-8">
          No images available in the gallery
        </p>
      )}
    </div>
  );
}

interface ImageUploadAndGalleryProps {
  initialImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  itemName: string;
  galleryImages?: string[];
}

export function ImageUploadAndGallery({ 
  initialImage, 
  onImageChange, 
  itemName,
  galleryImages = [] 
}: ImageUploadAndGalleryProps) {
  const [activeTab, setActiveTab] = useState<string>('upload');

  // Mock gallery images if none provided
  const mockGalleryImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929'
  ];

  const displayGalleryImages = galleryImages.length > 0 ? galleryImages : mockGalleryImages;

  const handleGalleryImageSelect = (imageUrl: string) => {
    onImageChange(imageUrl);
    setActiveTab('upload'); // Switch back to upload tab to show the selected image
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <ImageManager 
              initialImage={initialImage}
              onImageChange={onImageChange}
              itemName={itemName}
            />
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select from Gallery</h3>
              <p className="text-sm text-gray-500">
                Click on an image to use it for your menu item.
              </p>
              
              <ImageGallery 
                images={displayGalleryImages}
                onImageSelect={handleGalleryImageSelect}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
