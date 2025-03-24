"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from '@/types/menu';

interface TestMenuPreviewProps {
  menu: Menu;
}

export function TestMenuPreview({ menu }: TestMenuPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

  // Function to render menu sections and items
  const renderMenuContent = () => {
    return (
      <div className="space-y-8">
        {menu.sections.map((section, sIndex) => (
          <div key={sIndex} className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">
              {menu.displayLanguages.en && section.title.en}
              {menu.displayLanguages.en && menu.displayLanguages.es && <br />}
              {menu.displayLanguages.es && <span className="italic">{section.title.es}</span>}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, iIndex) => (
                <Card key={iIndex} className="overflow-hidden">
                  {item.image && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name.en} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {menu.displayLanguages.en && (
                          <h4 className="font-bold">{item.name.en}</h4>
                        )}
                        {menu.displayLanguages.es && (
                          <h4 className="italic">{item.name.es}</h4>
                        )}
                      </div>
                      <span className="font-bold">{item.price}</span>
                    </div>
                    
                    {menu.displayLanguages.en && item.description.en && (
                      <p className="text-sm mb-1">{item.description.en}</p>
                    )}
                    {menu.displayLanguages.es && item.description.es && (
                      <p className="text-sm italic">{item.description.es}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {menu.displayLanguages.en && menu.title.en}
          {menu.displayLanguages.en && menu.displayLanguages.es && " / "}
          {menu.displayLanguages.es && <span className="italic">{menu.title.es}</span>}
        </h2>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'preview' | 'json')}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="json">JSON Data</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="preview" className="mt-4">
        {renderMenuContent()}
      </TabsContent>
      
      <TabsContent value="json" className="mt-4">
        <Card>
          <CardContent className="p-4">
            <pre className="text-xs overflow-auto max-h-[500px] p-4 bg-gray-50 rounded-md">
              {JSON.stringify(menu, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
