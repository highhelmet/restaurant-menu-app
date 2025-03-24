import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageLibrary } from '@/components/menu/ImageLibrary';
import { MenuItem } from '@/types/menu';

interface MenuItemImageIntegrationProps {
  menuItem: MenuItem;
  onImageChange: (imageUrl: string | null) => void;
  allMenuItems?: MenuItem[];
}

export function MenuItemImageIntegration({ 
  menuItem, 
  onImageChange,
  allMenuItems = []
}: MenuItemImageIntegrationProps) {
  const [showImageLibrary, setShowImageLibrary] = useState(false);

  const handleImageChange = (imageUrl: string | null) => {
    onImageChange(imageUrl);
    setShowImageLibrary(false);
  };

  return (
    <div className="space-y-4">
      {menuItem.image ? (
        <div className="relative">
          <img 
            src={menuItem.image} 
            alt={menuItem.name.en} 
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center bg-black bg-opacity-50">
            <Button 
              type="button" 
              variant="secondary" 
              size="sm"
              onClick={() => setShowImageLibrary(true)}
            >
              Change Image
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              size="sm"
              onClick={() => onImageChange(null)}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-48 p-6">
            <p className="text-sm text-gray-500 mb-4">No image selected for this menu item</p>
            <Button
              onClick={() => setShowImageLibrary(true)}
            >
              Add Image
            </Button>
          </CardContent>
        </Card>
      )}

      {showImageLibrary && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Image Library</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setShowImageLibrary(false)}
              >
                Close
              </Button>
            </div>
            <ImageLibrary
              initialImage={menuItem.image || undefined}
              onImageChange={handleImageChange}
              itemName={menuItem.name.en || 'Menu Item'}
              menuItems={allMenuItems}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
