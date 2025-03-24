import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LanguageKey } from '@/types/menu';

interface TranslationToolProps {
  sourceText: string;
  sourceLang: LanguageKey;
  targetLang: LanguageKey;
  onTranslationComplete: (translatedText: string) => void;
}

export function TranslationTool({
  sourceText,
  sourceLang,
  targetLang,
  onTranslationComplete
}: TranslationToolProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!sourceText) return;
    
    setIsTranslating(true);
    
    try {
      // In a real application, this would call a translation API
      // For now, we'll simulate translation with predefined patterns
      
      let result = '';
      
      // Simple translation patterns for demo purposes
      if (sourceLang === 'en' && targetLang === 'es') {
        // English to Spanish common food terms
        result = sourceText
          .replace(/chicken/gi, 'pollo')
          .replace(/beef/gi, 'carne de res')
          .replace(/pork/gi, 'cerdo')
          .replace(/fish/gi, 'pescado')
          .replace(/rice/gi, 'arroz')
          .replace(/beans/gi, 'frijoles')
          .replace(/salad/gi, 'ensalada')
          .replace(/soup/gi, 'sopa')
          .replace(/appetizer/gi, 'aperitivo')
          .replace(/dessert/gi, 'postre')
          .replace(/with/gi, 'con')
          .replace(/and/gi, 'y')
          .replace(/or/gi, 'o')
          .replace(/the/gi, 'el')
          .replace(/a /gi, 'un ')
          .replace(/delicious/gi, 'delicioso')
          .replace(/fresh/gi, 'fresco')
          .replace(/served/gi, 'servido')
          .replace(/special/gi, 'especial')
          .replace(/house/gi, 'casa')
          .replace(/menu/gi, 'menú')
          .replace(/price/gi, 'precio');
      } else if (sourceLang === 'es' && targetLang === 'en') {
        // Spanish to English common food terms
        result = sourceText
          .replace(/pollo/gi, 'chicken')
          .replace(/carne de res/gi, 'beef')
          .replace(/cerdo/gi, 'pork')
          .replace(/pescado/gi, 'fish')
          .replace(/arroz/gi, 'rice')
          .replace(/frijoles/gi, 'beans')
          .replace(/ensalada/gi, 'salad')
          .replace(/sopa/gi, 'soup')
          .replace(/aperitivo/gi, 'appetizer')
          .replace(/postre/gi, 'dessert')
          .replace(/con/gi, 'with')
          .replace(/ y /gi, ' and ')
          .replace(/ o /gi, ' or ')
          .replace(/el /gi, 'the ')
          .replace(/un /gi, 'a ')
          .replace(/delicioso/gi, 'delicious')
          .replace(/fresco/gi, 'fresh')
          .replace(/servido/gi, 'served')
          .replace(/especial/gi, 'special')
          .replace(/casa/gi, 'house')
          .replace(/menú/gi, 'menu')
          .replace(/precio/gi, 'price');
      } else {
        // If languages are the same, just return the source text
        result = sourceText;
      }
      
      setTranslatedText(result);
      onTranslationComplete(result);
      
    } catch (error) {
      console.error('Translation error:', error);
      // Handle error
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-medium">Translation Tool</h3>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            Translate from {sourceLang === 'en' ? 'English' : 'Spanish'} to {targetLang === 'en' ? 'English' : 'Spanish'}
          </p>
          
          <Textarea
            value={translatedText}
            onChange={(e) => {
              setTranslatedText(e.target.value);
              onTranslationComplete(e.target.value);
            }}
            placeholder={`Translated text will appear here`}
            rows={4}
            className="mb-2"
          />
          
          <Button
            type="button"
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText}
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
