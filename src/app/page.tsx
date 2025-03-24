"use client";

import React, { useState } from 'react';
import { FileUploader } from '@/components/menu/FileUploader';
import { MenuEditor } from '@/components/menu/MenuEditor';
import { Menu } from '@/types/menu';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function MenuCreationPage() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [extractedText, setExtractedText] = useState('');

  const handleFilesAccepted = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to process file');
      }
      
      const data = await response.json();
      setExtractedText(data.text);
      
      // Switch to editor tab after processing
      setActiveTab('editor');
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveMenu = (savedMenu: Menu) => {
    setMenu(savedMenu);
    // Here you would typically save the menu to a database
    console.log('Menu saved:', savedMenu);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Restaurant Menu Creator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Menu</TabsTrigger>
          <TabsTrigger value="editor">Menu Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Upload Existing Menu</h2>
              <p className="text-gray-600 mb-6">
                Upload an existing menu in PDF, JPG, or PNG format. We'll extract the content using OCR technology.
              </p>
              
              <FileUploader 
                onFilesAccepted={handleFilesAccepted}
                acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/png']}
                maxFiles={1}
              />
              
              {isProcessing && (
                <div className="mt-4 text-center">
                  <p>Processing your menu...</p>
                  {/* Add a loading spinner here */}
                </div>
              )}
              
              {extractedText && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Extracted Content</h3>
                  <div className="p-4 bg-gray-50 rounded-md max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">{extractedText}</pre>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setActiveTab('editor')}>
                      Continue to Editor
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="editor" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Menu Editor</h2>
              <p className="text-gray-600 mb-6">
                Create or edit your menu. Add sections, items, descriptions, and prices.
              </p>
              
              <MenuEditor 
                initialMenu={menu || undefined}
                onSave={handleSaveMenu}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
