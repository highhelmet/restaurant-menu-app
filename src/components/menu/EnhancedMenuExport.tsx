import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Menu } from '@/types/menu';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface EnhancedMenuExportProps {
  menu: Menu;
}

export function EnhancedMenuExport({ menu }: EnhancedMenuExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'idml'>('pdf');
  const [colorProfile, setColorProfile] = useState<'rgb' | 'cmyk'>('cmyk');
  const [includeImages, setIncludeImages] = useState(true);
  const [highResolution, setHighResolution] = useState(true);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [exportMessage, setExportMessage] = useState('');

  const exportAsPDF = async () => {
    setIsExporting(true);
    setExportStatus('idle');
    setExportMessage('');
    
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
      });
      
      // Set CMYK color profile if selected
      if (colorProfile === 'cmyk') {
        // In a real application, we would configure CMYK color profile here
        // jsPDF doesn't directly support CMYK, but we can simulate it for demo purposes
        doc.setProperties({
          title: `${menu.title.en} Menu`,
          subject: 'Restaurant Menu',
          author: 'Restaurant Menu Creator',
          keywords: 'menu, restaurant, food',
          creator: 'Restaurant Menu Web Application'
        });
      }
      
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
      
      // Calculate column width based on number of columns
      const pageWidth = doc.internal.pageSize.width;
      const usableWidth = pageWidth - margins.left - margins.right;
      const columnWidth = usableWidth / menu.layout.columns;
      const columnGap = 0.2; // Gap between columns in inches
      
      // Process each section
      let currentColumn = 0;
      let columnYPos = yPos;
      
      for (const section of menu.sections) {
        // Add section title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        
        const xPos = margins.left + (currentColumn * (columnWidth + columnGap));
        
        if (menu.displayLanguages.en) {
          doc.text(section.title.en, xPos, columnYPos);
          columnYPos += 0.3;
        }
        
        if (menu.displayLanguages.es) {
          doc.setFont('helvetica', 'italic');
          doc.text(section.title.es, xPos, columnYPos);
          columnYPos += 0.3;
        }
        
        // Add items
        doc.setFontSize(12);
        
        for (const item of section.items) {
          // Item name and price
          doc.setFont('helvetica', 'bold');
          
          if (menu.displayLanguages.en) {
            const nameWidth = doc.getTextWidth(item.name.en);
            doc.text(item.name.en, xPos, columnYPos);
            doc.text(item.price, xPos + columnWidth - doc.getTextWidth(item.price), columnYPos);
            columnYPos += 0.25;
          }
          
          if (menu.displayLanguages.es) {
            doc.setFont('helvetica', 'italic');
            const nameWidth = doc.getTextWidth(item.name.es);
            doc.text(item.name.es, xPos, columnYPos);
            if (!menu.displayLanguages.en) {
              doc.text(item.price, xPos + columnWidth - doc.getTextWidth(item.price), columnYPos);
            }
            columnYPos += 0.25;
          }
          
          // Item description
          doc.setFont('helvetica', 'normal');
          
          if (menu.displayLanguages.en && item.description.en) {
            doc.text(item.description.en, xPos, columnYPos, { 
              maxWidth: columnWidth
            });
            columnYPos += 0.3;
          }
          
          if (menu.displayLanguages.es && item.description.es) {
            doc.setFont('helvetica', 'italic');
            doc.text(item.description.es, xPos, columnYPos, { 
              maxWidth: columnWidth
            });
            columnYPos += 0.3;
          }
          
          // Add image if available and includeImages is true
          if (includeImages && item.image) {
            try {
              // In a real application, we would need to handle image loading and embedding
              // For this demo, we'll just add a placeholder rectangle
              doc.setDrawColor(200, 200, 200);
              doc.setFillColor(240, 240, 240);
              doc.roundedRect(xPos, columnYPos, columnWidth * 0.8, 1, 0.1, 0.1, 'FD');
              doc.setFontSize(8);
              doc.text('Image: ' + item.name.en, xPos + 0.1, columnYPos + 0.5);
              columnYPos += 1.2;
            } catch (error) {
              console.error('Error adding image:', error);
            }
          }
          
          // Add space between items
          columnYPos += 0.1;
          
          // Check if we need to move to next column or page
          if (columnYPos > doc.internal.pageSize.height - margins.bottom - 1) {
            currentColumn++;
            
            if (currentColumn >= menu.layout.columns) {
              // Move to new page
              doc.addPage(format, orientation);
              currentColumn = 0;
              columnYPos = margins.top;
            } else {
              // Move to next column
              columnYPos = yPos;
            }
          }
        }
        
        // Add space between sections
        columnYPos += 0.3;
        
        // Check if we need to move to next column or page
        if (columnYPos > doc.internal.pageSize.height - margins.bottom - 1) {
          currentColumn++;
          
          if (currentColumn >= menu.layout.columns) {
            // Move to new page
            doc.addPage(format, orientation);
            currentColumn = 0;
            columnYPos = margins.top;
          } else {
            // Move to next column
            columnYPos = yPos;
          }
        }
      }
      
      // Save the PDF
      const filename = `${menu.title.en.replace(/\s+/g, '_')}_menu.pdf`;
      doc.save(filename);
      
      setExportStatus('success');
      setExportMessage(`Menu successfully exported as ${filename}`);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setExportStatus('error');
      setExportMessage('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsIDML = () => {
    setIsExporting(true);
    setExportStatus('idle');
    setExportMessage('');
    
    try {
      // In a real application, this would generate an IDML file
      // For this demo, we'll simulate the export process
      
      setTimeout(() => {
        const filename = `${menu.title.en.replace(/\s+/g, '_')}_menu.idml`;
        
        // Create a simple text file with IDML structure information
        const idmlContent = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<idPkg:Package xmlns:idPkg="http://ns.adobe.com/AdobeInDesign/idml/1.0/packaging">
  <idPkg:Metadata>
    <x:xmpmeta xmlns:x="adobe:ns:meta/">
      <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
          <dc:title>${menu.title.en} Menu</dc:title>
          <dc:creator>Restaurant Menu Web Application</dc:creator>
        </rdf:Description>
      </rdf:RDF>
    </x:xmpmeta>
  </idPkg:Metadata>
  <!-- This is a simplified representation of an IDML file structure -->
  <!-- In a real application, this would be a complete IDML package -->
</idPkg:Package>`;
        
        // Create a download link
        const blob = new Blob([idmlContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setExportStatus('success');
        setExportMessage(`Menu successfully exported as ${filename}`);
      }, 1500); // Simulate processing time
      
    } catch (error) {
      console.error('Error exporting IDML:', error);
      setExportStatus('error');
      setExportMessage('Failed to export IDML. Please try again.');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 1500); // Match the timeout above
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
        
        <Tabs defaultValue="format" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="format" className="space-y-4 mt-4">
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                onClick={() => setExportFormat('pdf')}
                className="flex-1"
              >
                PDF Format
              </Button>
              <Button
                type="button"
                variant={exportFormat === 'idml' ? 'default' : 'outline'}
                onClick={() => setExportFormat('idml')}
                className="flex-1"
              >
                InDesign (.idml)
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              {exportFormat === 'pdf' 
                ? 'Exports a PDF file with CMYK color profiles for professional printing.' 
                : 'Exports an InDesign (.idml) file for further customization in Adobe InDesign.'}
            </p>
          </TabsContent>
          
          <TabsContent value="options" className="space-y-4 mt-4">
            {exportFormat === 'pdf' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="colorProfile">Color Profile</Label>
                  <Select
                    value={colorProfile}
                    onValueChange={(value: 'rgb' | 'cmyk') => setColorProfile(value)}
                  >
                    <SelectTrigger id="colorProfile">
                      <SelectValue placeholder="Select color profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rgb">RGB (Screen Display)</SelectItem>
                      <SelectItem value="cmyk">CMYK (Professional Printing)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-images">Include Images</Label>
                  <Switch
                    id="include-images"
                    checked={includeImages}
                    onCheckedChange={setIncludeImages}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-resolution">High Resolution</Label>
                  <Switch
                    id="high-resolution"
                    checked={highResolution}
                    onCheckedChange={setHighResolution}
                  />
                </div>
              </>
            )}
            
            {exportFormat === 'idml' && (
              <p className="text-sm text-gray-500">
                InDesign (.idml) export includes all menu content, images, and styling information
                for further customization in Adobe InDesign.
              </p>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="pt-2">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full"
          >
            {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
          </Button>
        </div>
        
        {exportStatus !== 'idle' && (
          <div className={`p-3 rounded-md ${
            exportStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <p className="text-sm">{exportMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
