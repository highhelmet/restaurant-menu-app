import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageUploadAndGallery } from '@/components/menu/ImageUploadAndGallery';
import { MenuItem } from '@/types/menu';

interface ImageBrowserProps {
  menuItems: MenuItem[];
  onImageSelect: (imageUrl: string) => void;
}

export function ImageBrowser({ menuItems, onImageSelect }: ImageBrowserProps) {
  // Filter menu items that have images
  const itemsWithImages = menuItems.filter(item => item.image);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Browse Menu Item Images</h3>
      
      {itemsWithImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {itemsWithImages.map((item, index) => (
            <div 
              key={index} 
              className="relative cursor-pointer border rounded-md overflow-hidden hover:opacity-90 transition-opacity"
              onClick={() => item.image && onImageSelect(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.name.en} 
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                <p className="text-xs text-white truncate">{item.name.en}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-8">
          No menu item images available
        </p>
      )}
    </div>
  );
}

interface ImagePreviewDialogProps {
  image: string | null;
  itemName: string;
}

export function ImagePreviewDialog({ image, itemName }: ImagePreviewDialogProps) {
  if (!image) return null;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Preview Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{itemName}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img 
            src={image} 
            alt={itemName} 
            className="w-full object-contain max-h-[60vh]"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ImageLibraryProps {
  initialImage?: string;
  onImageChange: (imageUrl: string | null) => void;
  itemName: string;
  menuItems?: MenuItem[];
}

export function ImageLibrary({ 
  initialImage, 
  onImageChange, 
  itemName,
  menuItems = []
}: ImageLibraryProps) {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [currentImage, setCurrentImage] = useState<string | null>(initialImage || null);

  const handleImageChange = (imageUrl: string | null) => {
    setCurrentImage(imageUrl);
    onImageChange(imageUrl);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Menu Item Image</h3>
          {currentImage && (
            <ImagePreviewDialog 
              image={currentImage}
              itemName={itemName}
            />
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="browse">Browse Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-4">
            <ImageUploadAndGallery 
              initialImage={currentImage || undefined}
              onImageChange={handleImageChange}
              itemName={itemName}
            />
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select from Gallery</h3>
              <p className="text-sm text-gray-500">
                Click on an image to use it for your menu item.
              </p>
              
              {/* Use the gallery component from ImageUploadAndGallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {[
                  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
                  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
                  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
                  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
                  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
                  'https://images.unsplash.com/photo-1484723091739-30a097e8f929'
                ].map((image, index) => (
                  <div 
                    key={index} 
                    className="relative cursor-pointer border rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                    onClick={() => handleImageChange(image)}
                  >
                    <img 
                      src={image} 
                      alt={`Gallery image ${index + 1}`} 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="browse" className="mt-4">
            <ImageBrowser 
              menuItems={menuItems}
              onImageSelect={(imageUrl) => handleImageChange(imageUrl)}
            />
          </TabsContent>
        </Tabs>
        
        {currentImage && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Current Image</h4>
            <div className="relative">
              <img 
                src={currentImage} 
                alt={itemName} 
                className="w-full h-48 object-cover rounded-md"
              />
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleImageChange(null)}
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
