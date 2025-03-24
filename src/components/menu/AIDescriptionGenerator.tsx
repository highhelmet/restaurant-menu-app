import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LanguageKey } from '@/types/menu';

interface AIDescriptionGeneratorProps {
  foodName: { [key in LanguageKey]: string };
  currentDescription: { [key in LanguageKey]: string };
  onDescriptionGenerated: (description: { [key in LanguageKey]: string }) => void;
}

export function AIDescriptionGenerator({ 
  foodName, 
  currentDescription, 
  onDescriptionGenerated 
}: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescriptions, setGeneratedDescriptions] = useState<{ [key in LanguageKey]: string }>({
    en: currentDescription.en || '',
    es: currentDescription.es || ''
  });

  const generateDescription = async (language: LanguageKey) => {
    if (!foodName[language]) return;
    
    setIsGenerating(true);
    
    try {
      // In a real application, this would call an AI service API
      // For now, we'll simulate the AI generation with predefined templates
      
      let description = '';
      
      if (language === 'en') {
        const templates = [
          `Our delicious ${foodName.en} is prepared with the finest ingredients, creating a perfect balance of flavors that will delight your taste buds.`,
          `Experience the authentic taste of our ${foodName.en}, carefully crafted by our expert chefs using traditional techniques and premium ingredients.`,
          `Indulge in our mouthwatering ${foodName.en}, a customer favorite that combines rich flavors and perfect textures for an unforgettable dining experience.`
        ];
        description = templates[Math.floor(Math.random() * templates.length)];
      } else {
        const templates = [
          `Nuestro delicioso ${foodName.es} está preparado con los mejores ingredientes, creando un equilibrio perfecto de sabores que deleitará su paladar.`,
          `Experimente el auténtico sabor de nuestro ${foodName.es}, cuidadosamente elaborado por nuestros chefs expertos utilizando técnicas tradicionales e ingredientes premium.`,
          `Deléitese con nuestro apetitoso ${foodName.es}, un favorito de los clientes que combina ricos sabores y texturas perfectas para una experiencia gastronómica inolvidable.`
        ];
        description = templates[Math.floor(Math.random() * templates.length)];
      }
      
      // Update the generated descriptions
      setGeneratedDescriptions(prev => ({
        ...prev,
        [language]: description
      }));
      
      // Call the callback with the updated descriptions
      onDescriptionGenerated({
        ...generatedDescriptions,
        [language]: description
      });
      
    } catch (error) {
      console.error('Error generating description:', error);
      // Handle error
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">English Description</h3>
            <Textarea
              value={generatedDescriptions.en}
              onChange={(e) => {
                const newDesc = e.target.value;
                setGeneratedDescriptions(prev => ({ ...prev, en: newDesc }));
                onDescriptionGenerated({ ...generatedDescriptions, en: newDesc });
              }}
              placeholder="Item description in English"
              rows={3}
              className="mb-2"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => generateDescription('en')}
              disabled={isGenerating || !foodName.en}
            >
              {isGenerating ? 'Generating...' : 'Generate AI Description'}
            </Button>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Spanish Description</h3>
            <Textarea
              value={generatedDescriptions.es}
              onChange={(e) => {
                const newDesc = e.target.value;
                setGeneratedDescriptions(prev => ({ ...prev, es: newDesc }));
                onDescriptionGenerated({ ...generatedDescriptions, es: newDesc });
              }}
              placeholder="Item description in Spanish"
              rows={3}
              className="mb-2"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => generateDescription('es')}
              disabled={isGenerating || !foodName.es}
            >
              {isGenerating ? 'Generando...' : 'Generar Descripción AI'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
