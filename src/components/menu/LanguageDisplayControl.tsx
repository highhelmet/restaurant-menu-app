import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageKey } from '@/types/menu';

interface LanguageDisplayControlProps {
  displayLanguages: {
    en: boolean;
    es: boolean;
  };
  onDisplayLanguagesChange: (displayLanguages: { en: boolean; es: boolean }) => void;
}

export function LanguageDisplayControl({
  displayLanguages,
  onDisplayLanguagesChange
}: LanguageDisplayControlProps) {
  const [activeTab, setActiveTab] = useState<string>(
    displayLanguages.en && displayLanguages.es 
      ? 'both' 
      : displayLanguages.en 
        ? 'english' 
        : 'spanish'
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let newDisplayLanguages = { en: false, es: false };
    
    switch (value) {
      case 'english':
        newDisplayLanguages = { en: true, es: false };
        break;
      case 'spanish':
        newDisplayLanguages = { en: false, es: true };
        break;
      case 'both':
        newDisplayLanguages = { en: true, es: true };
        break;
    }
    
    onDisplayLanguagesChange(newDisplayLanguages);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Language Display Settings</h3>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="english">English Only</TabsTrigger>
            <TabsTrigger value="spanish">Spanish Only</TabsTrigger>
            <TabsTrigger value="both">Bilingual</TabsTrigger>
          </TabsList>
          
          <TabsContent value="english" className="mt-4">
            <p className="text-sm text-gray-600">
              Menu will display content in English only. Spanish translations will be saved but not displayed.
            </p>
          </TabsContent>
          
          <TabsContent value="spanish" className="mt-4">
            <p className="text-sm text-gray-600">
              Menu will display content in Spanish only. English translations will be saved but not displayed.
            </p>
          </TabsContent>
          
          <TabsContent value="both" className="mt-4">
            <p className="text-sm text-gray-600">
              Menu will display content in both English and Spanish, with English appearing first followed by Spanish.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
