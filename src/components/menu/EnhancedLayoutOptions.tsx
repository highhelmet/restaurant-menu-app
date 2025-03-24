import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ColorPicker } from '@/components/menu/ColorPicker';

interface EnhancedLayoutOptionsProps {
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
  initialTheme?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    headerStyle: 'centered' | 'left-aligned' | 'underlined' | 'boxed';
    itemStyle: 'simple' | 'boxed' | 'separated';
    showPriceWithDots: boolean;
  };
  initialDisplayLanguages: {
    en: boolean;
    es: boolean;
  };
  onLayoutChange: (layout: any) => void;
  onThemeChange?: (theme: any) => void;
  onDisplayLanguagesChange: (displayLanguages: { en: boolean; es: boolean }) => void;
}

export function EnhancedLayoutOptions({
  initialLayout,
  initialTheme = {
    primaryColor: '#000000',
    secondaryColor: '#666666',
    fontFamily: 'serif',
    headerStyle: 'centered',
    itemStyle: 'simple',
    showPriceWithDots: true
  },
  initialDisplayLanguages,
  onLayoutChange,
  onThemeChange = () => {},
  onDisplayLanguagesChange
}: EnhancedLayoutOptionsProps) {
  const [layout, setLayout] = useState(initialLayout);
  const [theme, setTheme] = useState(initialTheme);
  const [displayLanguages, setDisplayLanguages] = useState(initialDisplayLanguages);
  const [activeTab, setActiveTab] = useState<string>('layout');

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

  const handleThemeChange = (key: string, value: any) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    onThemeChange(newTheme);
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

  const fontOptions = [
    { value: 'serif', label: 'Serif (Traditional)' },
    { value: 'sans-serif', label: 'Sans-Serif (Modern)' },
    { value: 'cursive', label: 'Cursive (Elegant)' },
    { value: 'monospace', label: 'Monospace (Clean)' }
  ];

  const headerStyleOptions = [
    { value: 'centered', label: 'Centered' },
    { value: 'left-aligned', label: 'Left Aligned' },
    { value: 'underlined', label: 'Underlined' },
    { value: 'boxed', label: 'Boxed' }
  ];

  const itemStyleOptions = [
    { value: 'simple', label: 'Simple' },
    { value: 'boxed', label: 'Boxed' },
    { value: 'separated', label: 'Separated with Lines' }
  ];

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout" className="space-y-6 mt-6">
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
              <p className="text-xs text-gray-500">
                Number of columns for menu items. More columns work better with landscape orientation.
              </p>
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
          </TabsContent>
          
          <TabsContent value="theme" className="space-y-6 mt-6">
            <h3 className="text-lg font-medium">Theme Options</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color (Titles)</Label>
                  <ColorPicker
                    color={theme.primaryColor}
                    onChange={(color) => handleThemeChange('primaryColor', color)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Secondary Color (Text)</Label>
                  <ColorPicker
                    color={theme.secondaryColor}
                    onChange={(color) => handleThemeChange('secondaryColor', color)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select
                  value={theme.fontFamily}
                  onValueChange={(value) => handleThemeChange('fontFamily', value)}
                >
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerStyle">Header Style</Label>
                <Select
                  value={theme.headerStyle}
                  onValueChange={(value: 'centered' | 'left-aligned' | 'underlined' | 'boxed') => 
                    handleThemeChange('headerStyle', value)
                  }
                >
                  <SelectTrigger id="headerStyle">
                    <SelectValue placeholder="Select header style" />
                  </SelectTrigger>
                  <SelectContent>
                    {headerStyleOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="itemStyle">Item Style</Label>
                <Select
                  value={theme.itemStyle}
                  onValueChange={(value: 'simple' | 'boxed' | 'separated') => 
                    handleThemeChange('itemStyle', value)
                  }
                >
                  <SelectTrigger id="itemStyle">
                    <SelectValue placeholder="Select item style" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemStyleOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="price-dots"
                  checked={theme.showPriceWithDots}
                  onCheckedChange={(checked) => handleThemeChange('showPriceWithDots', checked)}
                />
                <Label htmlFor="price-dots">Show dotted line between item and price</Label>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="language" className="space-y-6 mt-6">
            <h3 className="text-lg font-medium">Language Display Settings</h3>
            
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
              
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  {displayLanguages.en && displayLanguages.es
                    ? "Menu will display content in both English and Spanish, with English appearing first followed by Spanish."
                    : displayLanguages.en
                    ? "Menu will display content in English only. Spanish translations will be saved but not displayed."
                    : "Menu will display content in Spanish only. English translations will be saved but not displayed."
                  }
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
