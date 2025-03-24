import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    onChange(newColor);
  };

  // Predefined color palette for restaurant menus
  const colorPalette = [
    '#000000', // Black
    '#333333', // Dark Gray
    '#666666', // Medium Gray
    '#990000', // Dark Red
    '#cc0000', // Bright Red
    '#663300', // Brown
    '#996633', // Light Brown
    '#006600', // Dark Green
    '#009900', // Bright Green
    '#000066', // Dark Blue
    '#0000cc', // Bright Blue
    '#660066', // Purple
    '#cc6600', // Orange
    '#ffcc00', // Gold
  ];

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded-md border border-gray-300" 
          style={{ backgroundColor: selectedColor }}
        />
        <Input
          type="text"
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            onChange(e.target.value);
          }}
          className="w-24"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Choose
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <Label>Color Picker</Label>
              <Input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full h-10"
              />
              <div className="grid grid-cols-7 gap-1 mt-2">
                {colorPalette.map((paletteColor) => (
                  <div
                    key={paletteColor}
                    className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300"
                    style={{ backgroundColor: paletteColor }}
                    onClick={() => {
                      setSelectedColor(paletteColor);
                      onChange(paletteColor);
                    }}
                  />
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
