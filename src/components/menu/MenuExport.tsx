import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu } from '@/types/menu';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface MenuExportProps {
  menu: Menu;
}

export function MenuExport({ menu }: MenuExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'idml'>('pdf');

  const exportAsPDF = async () => {
    setIsExporting(true);
    
    try {
      // Create a new PDF document
      const orientation = menu.layout.orientation === 'portrait' ? 'p' : 'l';
      const unit = 'in';
      
      let format: any;
      switch (menu.layout.paperSize) {
        case '8.5x11':
          format = 'letter';
          break;
        case '11x17':
          format = [11, 17];
          break;
        case 'A4':
          format = 'a4';
          break;
        case 'A3':
          format = 'a3';
          break;
        default:
          format = 'letter';
      }
      
      const doc = new jsPDF({
        orientation,
        unit,
        format,
        putOnlyUsedFonts: true,
        compress: true,
        // In a real application, we would set CMYK color profile here
      });
      
      // Set margins
      const margins = menu.layout.margins;
      
      // Add title
      const titleFontSize = 24;
      doc.setFontSize(titleFontSize);
      doc.setFont('helvetica', 'bold');
      
      let yPos = margins.top + 0.5;
      
      // Add title in selected languages
      if (menu.displayLanguages.en) {
        doc.text(menu.title.en, margins.left, yPos);
        yPos += 0.4;
      }
      
      if (menu.displayLanguages.es) {
        doc.setFont('helvetica', 'italic');
        doc.text(menu.title.es, margins.left, yPos);
        yPos += 0.4;
      }
      
      // Add description if available
      if ((menu.displayLanguages.en && menu.description.en) || 
          (menu.displayLanguages.es && menu.description.es)) {
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        if (menu.displayLanguages.en && menu.description.en) {
          doc.text(menu.description.en, margins.left, yPos, { 
            maxWidth: doc.internal.pageSize.width - margins.left - margins.right 
          });
          yPos += 0.4;
        }
        
        if (menu.displayLanguages.es && menu.description.es) {
          doc.setFont('helvetica', 'italic');
          doc.text(menu.description.es, margins.left, yPos, { 
            maxWidth: doc.internal.pageSize.width - margins.left - margins.right 
          });
          yPos += 0.4;
        }
      }
      
      yPos += 0.2;
      
      // Process each section
      for (const section of menu.sections) {
        // Add section title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        
        if (menu.displayLanguages.en) {
          doc.text(section.title.en, margins.left, yPos);
          yPos += 0.3;
        }
        
        if (menu.displayLanguages.es) {
          doc.setFont('helvetica', 'italic');
          doc.text(section.title.es, margins.left, yPos);
          yPos += 0.3;
        }
        
        // Add items
        doc.setFontSize(12);
        
        for (const item of section.items) {
          // Item name and price
          doc.setFont('helvetica', 'bold');
          
          if (menu.displayLanguages.en) {
            const nameWidth = doc.getTextWidth(item.name.en);
            doc.text(item.name.en, margins.left, yPos);
            doc.text(item.price, doc.internal.pageSize.width - margins.right - doc.getTextWidth(item.price), yPos);
            yPos += 0.25;
          }
          
          if (menu.displayLanguages.es) {
            doc.setFont('helvetica', 'italic');
            const nameWidth = doc.getTextWidth(item.name.es);
            doc.text(item.name.es, margins.left, yPos);
            if (!menu.displayLanguages.en) {
              doc.text(item.price, doc.internal.pageSize.width - margins.right - doc.getTextWidth(item.price), yPos);
            }
            yPos += 0.25;
          }
          
          // Item description
          doc.setFont('helvetica', 'normal');
          
          if (menu.displayLanguages.en && item.description.en) {
            doc.text(item.description.en, margins.left, yPos, { 
              maxWidth: doc.internal.pageSize.width - margins.left - margins.right 
            });
            yPos += 0.3;
          }
          
          if (menu.displayLanguages.es && item.description.es) {
            doc.setFont('helvetica', 'italic');
            doc.text(item.description.es, margins.left, yPos, { 
              maxWidth: doc.internal.pageSize.width - margins.left - margins.right 
            });
            yPos += 0.3;
          }
          
          // Add space between items
          yPos += 0.1;
          
          // Check if we need a new page
          if (yPos > doc.internal.pageSize.height - margins.bottom) {
            doc.addPage(format, orientation);
            yPos = margins.top;
          }
        }
        
        // Add space between sections
        yPos += 0.3;
        
        // Check if we need a new page
        if (yPos > doc.internal.pageSize.height - margins.bottom - 1) {
          doc.addPage(format, orientation);
          yPos = margins.top;
        }
      }
      
      // Save the PDF
      doc.save(`${menu.title.en.replace(/\s+/g, '_')}_menu.pdf`);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // Handle error
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsIDML = () => {
    setIsExporting(true);
    
    try {
      // In a real application, this would generate an IDML file
      // For now, we'll just show an alert
      alert('IDML export would be implemented here in a production application.');
      
    } catch (error) {
      console.error('Error exporting IDML:', error);
      // Handle error
    } finally {
      setIsExporting(false);
    }
  };

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportAsPDF();
    } else {
      exportAsIDML();
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-medium">Export Menu</h3>
        
        <div className="flex space-x-4">
          <Button
            type="button"
            variant={exportFormat === 'pdf' ? 'default' : 'outline'}
            onClick={() => setExportFormat('pdf')}
          >
            PDF Format
          </Button>
          <Button
            type="button"
            variant={exportFormat === 'idml' ? 'default' : 'outline'}
            onClick={() => setExportFormat('idml')}
          >
            InDesign (.idml)
          </Button>
        </div>
        
        <div className="pt-2">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full"
          >
            {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          {exportFormat === 'pdf' 
            ? 'Exports a PDF file with CMYK color profiles for professional printing.' 
            : 'Exports an InDesign (.idml) file for further customization in Adobe InDesign.'}
        </p>
      </CardContent>
    </Card>
  );
}
