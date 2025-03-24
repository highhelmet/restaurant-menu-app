import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LayoutOptionsProps {
  initialLayout: {
    orientation: 'portrait' | 'landscape';
    paperSize: '8.5x11' | '11x17' | 'A4' | 'A3';
    columns: number;
    margins: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  initialDisplayLanguages: {
    en: boolean;
    es: boolean;
  };
  onLayoutChange: (layout: any) => void;
  onDisplayLanguagesChange: (languages: any) => void;
}

export function LayoutOptions({
  initialLayout,
  initialDisplayLanguages,
  onLayoutChange,
  onDisplayLanguagesChange
}: LayoutOptionsProps) {
  const [layout, setLayout] = useState(initialLayout);
  const [displayLanguages, setDisplayLanguages] = useState(initialDisplayLanguages);

  const handleLayoutChange = (key: string, value: any) => {
    const newLayout = { ...layout, [key]: value };
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const handleMarginChange = (key: string, value: number) => {
    const newMargins = { ...layout.margins, [key]: value };
    const newLayout = { ...layout, margins: newMargins };
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const handleLanguageChange = (key: 'en' | 'es', value: boolean) => {
    // Ensure at least one language is always selected
    if (!value && !displayLanguages[key === 'en' ? 'es' : 'en']) {
      return;
    }
    
    const newDisplayLanguages = { ...displayLanguages, [key]: value };
    setDisplayLanguages(newDisplayLanguages);
    onDisplayLanguagesChange(newDisplayLanguages);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Layout Options</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orientation">Orientation</Label>
              <Select
                value={layout.orientation}
                onValueChange={(value: 'portrait' | 'landscape') => handleLayoutChange('orientation', value)}
              >
                <SelectTrigger id="orientation">
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paperSize">Paper Size</Label>
              <Select
                value={layout.paperSize}
                onValueChange={(value: '8.5x11' | '11x17' | 'A4' | 'A3') => handleLayoutChange('paperSize', value)}
              >
                <SelectTrigger id="paperSize">
                  <SelectValue placeholder="Select paper size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8.5x11">Letter (8.5" x 11")</SelectItem>
                  <SelectItem value="11x17">Tabloid (11" x 17")</SelectItem>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Columns: {layout.columns}</Label>
            <Slider
              value={[layout.columns]}
              min={1}
              max={3}
              step={1}
              onValueChange={(value) => handleLayoutChange('columns', value[0])}
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Margins (inches)</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Top: {layout.margins.top}</Label>
                <Slider
                  value={[layout.margins.top]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => handleMarginChange('top', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Right: {layout.margins.right}</Label>
                <Slider
                  value={[layout.margins.right]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => handleMarginChange('right', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Bottom: {layout.margins.bottom}</Label>
                <Slider
                  value={[layout.margins.bottom]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => handleMarginChange('bottom', value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Left: {layout.margins.left}</Label>
                <Slider
                  value={[layout.margins.left]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => handleMarginChange('left', value[0])}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Language Display</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="english-toggle">Show English</Label>
              <Switch
                id="english-toggle"
                checked={displayLanguages.en}
                onCheckedChange={(checked) => handleLanguageChange('en', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="spanish-toggle">Show Spanish</Label>
              <Switch
                id="spanish-toggle"
                checked={displayLanguages.es}
                onCheckedChange={(checked) => handleLanguageChange('es', checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
