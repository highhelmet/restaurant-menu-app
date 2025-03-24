import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedAIDescriptionGenerator } from '@/components/menu/EnhancedAIDescriptionGenerator';
import { MenuItem } from '@/types/menu';

interface AIDescriptionIntegrationProps {
  menuItem: MenuItem;
  onDescriptionChange: (descriptions: { en: string; es: string }) => void;
}

export function AIDescriptionIntegration({ 
  menuItem, 
  onDescriptionChange 
}: AIDescriptionIntegrationProps) {
  const [showGenerator, setShowGenerator] = useState(false);

  const handleDescriptionGenerated = (descriptions: { en: string; es: string }) => {
    onDescriptionChange(descriptions);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Item Description</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowGenerator(!showGenerator)}
        >
          {showGenerator ? 'Hide AI Generator' : 'Show AI Generator'}
        </Button>
      </div>

      {/* Display current descriptions */}
      <div className="space-y-2">
        {menuItem.description.en && (
          <div>
            <h4 className="text-sm font-medium">English Description:</h4>
            <p className="text-sm p-3 bg-gray-50 rounded-md">{menuItem.description.en}</p>
          </div>
        )}
        
        {menuItem.description.es && (
          <div>
            <h4 className="text-sm font-medium">Spanish Description:</h4>
            <p className="text-sm p-3 bg-gray-50 rounded-md">{menuItem.description.es}</p>
          </div>
        )}
        
        {!menuItem.description.en && !menuItem.description.es && (
          <p className="text-sm text-gray-500">No descriptions added yet. Use the AI generator to create enticing descriptions.</p>
        )}
      </div>

      {showGenerator && (
        <EnhancedAIDescriptionGenerator
          foodName={menuItem.name}
          currentDescription={menuItem.description}
          onDescriptionGenerated={handleDescriptionGenerated}
        />
      )}
    </div>
  );
}
