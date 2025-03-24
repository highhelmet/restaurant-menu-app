import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedLayoutOptions } from '@/components/menu/EnhancedLayoutOptions';
import { Menu } from '@/types/menu';

interface LayoutAndStylingIntegrationProps {
  menu: Menu;
  onLayoutChange: (layout: any) => void;
  onThemeChange: (theme: any) => void;
  onDisplayLanguagesChange: (displayLanguages: { en: boolean; es: boolean }) => void;
}

export function LayoutAndStylingIntegration({
  menu,
  onLayoutChange,
  onThemeChange,
  onDisplayLanguagesChange
}: LayoutAndStylingIntegrationProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Menu Layout & Styling</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowOptions(!showOptions)}
        >
          {showOptions ? 'Hide Options' : 'Show Options'}
        </Button>
      </div>

      {/* Display current layout summary */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Orientation:</span> {menu.layout.orientation}
            </div>
            <div>
              <span className="font-medium">Paper Size:</span> {menu.layout.paperSize}
            </div>
            <div>
              <span className="font-medium">Columns:</span> {menu.layout.columns}
            </div>
            <div>
              <span className="font-medium">Languages:</span> {
                menu.displayLanguages.en && menu.displayLanguages.es
                  ? "English & Spanish"
                  : menu.displayLanguages.en
                    ? "English only"
                    : "Spanish only"
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {showOptions && (
        <EnhancedLayoutOptions
          initialLayout={menu.layout}
          initialTheme={menu.theme || undefined}
          initialDisplayLanguages={menu.displayLanguages}
          onLayoutChange={onLayoutChange}
          onThemeChange={onThemeChange}
          onDisplayLanguagesChange={onDisplayLanguagesChange}
        />
      )}
    </div>
  );
}
