import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LanguageKey } from '@/types/menu';

interface LanguageSwitcherProps {
  activeLanguage: LanguageKey;
  onLanguageChange: (language: LanguageKey) => void;
}

export function LanguageSwitcher({
  activeLanguage,
  onLanguageChange
}: LanguageSwitcherProps) {
  return (
    <div className="flex space-x-2">
      <Button
        type="button"
        variant={activeLanguage === 'en' ? 'default' : 'outline'}
        onClick={() => onLanguageChange('en')}
        className="w-full"
      >
        English
      </Button>
      <Button
        type="button"
        variant={activeLanguage === 'es' ? 'default' : 'outline'}
        onClick={() => onLanguageChange('es')}
        className="w-full"
      >
        Español
      </Button>
    </div>
  );
}

interface BilingualEditorProps {
  englishValue: string;
  spanishValue: string;
  onEnglishChange: (value: string) => void;
  onSpanishChange: (value: string) => void;
  renderEditor: (value: string, onChange: (value: string) => void, language: LanguageKey) => React.ReactNode;
}

export function BilingualEditor({
  englishValue,
  spanishValue,
  onEnglishChange,
  onSpanishChange,
  renderEditor
}: BilingualEditorProps) {
  const [activeTab, setActiveTab] = useState<LanguageKey>('en');

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <LanguageSwitcher 
          activeLanguage={activeTab}
          onLanguageChange={setActiveTab}
        />
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as LanguageKey)} className="w-full">
          <TabsContent value="en">
            {renderEditor(englishValue, onEnglishChange, 'en')}
          </TabsContent>
          <TabsContent value="es">
            {renderEditor(spanishValue, onSpanishChange, 'es')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
