import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedMenuExport } from '@/components/menu/EnhancedMenuExport';
import { Menu } from '@/types/menu';

interface ExportIntegrationProps {
  menu: Menu;
}

export function ExportIntegration({ menu }: ExportIntegrationProps) {
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Export Menu</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowExport(!showExport)}
        >
          {showExport ? 'Hide Export Options' : 'Show Export Options'}
        </Button>
      </div>

      {showExport ? (
        <EnhancedMenuExport menu={menu} />
      ) : (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              Export your menu as a PDF with CMYK color profiles for professional printing, 
              or as an InDesign (.idml) file for further customization.
            </p>
            <Button 
              onClick={() => setShowExport(true)}
              className="w-full"
            >
              Export Menu
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
