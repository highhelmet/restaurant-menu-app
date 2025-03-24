import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TranslationTool } from '@/components/menu/TranslationTool';
import { LanguageKey } from '@/types/menu';

interface BilingualTextAreaProps {
  englishValue: string;
  spanishValue: string;
  onEnglishChange: (value: string) => void;
  onSpanishChange: (value: string) => void;
  englishLabel?: string;
  spanishLabel?: string;
  placeholder?: {
    en: string;
    es: string;
  };
  rows?: number;
}

export function BilingualTextArea({
  englishValue,
  spanishValue,
  onEnglishChange,
  onSpanishChange,
  englishLabel = "English Text",
  spanishLabel = "Spanish Text",
  placeholder = { en: "Enter text in English", es: "Ingrese texto en Español" },
  rows = 3
}: BilingualTextAreaProps) {
  const [showTranslation, setShowTranslation] = useState<{
    show: boolean;
    source: LanguageKey;
    target: LanguageKey;
  }>({ show: false, source: 'en', target: 'es' });

  // Handle translation completion
  const handleTranslationComplete = (translatedText: string) => {
    if (showTranslation.target === 'en') {
      onEnglishChange(translatedText);
    } else {
      onSpanishChange(translatedText);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">{englishLabel}</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTranslation({ 
                show: !showTranslation.show || showTranslation.source !== 'en', 
                source: 'en', 
                target: 'es' 
              })}
            >
              Translate to Spanish
            </Button>
          </div>
          <Textarea
            value={englishValue}
            onChange={(e) => onEnglishChange(e.target.value)}
            placeholder={placeholder.en}
            rows={rows}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">{spanishLabel}</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTranslation({ 
                show: !showTranslation.show || showTranslation.source !== 'es', 
                source: 'es', 
                target: 'en' 
              })}
            >
              Translate to English
            </Button>
          </div>
          <Textarea
            value={spanishValue}
            onChange={(e) => onSpanishChange(e.target.value)}
            placeholder={placeholder.es}
            rows={rows}
          />
        </div>

        {showTranslation.show && (
          <TranslationTool
            sourceText={showTranslation.source === 'en' ? englishValue : spanishValue}
            sourceLang={showTranslation.source}
            targetLang={showTranslation.target}
            onTranslationComplete={handleTranslationComplete}
          />
        )}
      </CardContent>
    </Card>
  );
}
