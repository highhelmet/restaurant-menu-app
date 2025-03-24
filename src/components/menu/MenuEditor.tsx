"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Menu, MenuSection, MenuItem } from '@/types/menu';

const menuItemSchema = z.object({
  name: z.object({
    en: z.string().min(1, "English name is required"),
    es: z.string().min(1, "Spanish name is required"),
  }),
  description: z.object({
    en: z.string().optional(),
    es: z.string().optional(),
  }),
  price: z.string().min(1, "Price is required"),
});

const menuSectionSchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    es: z.string().min(1, "Spanish title is required"),
  }),
  items: z.array(menuItemSchema),
});

const menuSchema = z.object({
  title: z.object({
    en: z.string().min(1, "English title is required"),
    es: z.string().min(1, "Spanish title is required"),
  }),
  description: z.object({
    en: z.string().optional(),
    es: z.string().optional(),
  }),
  sections: z.array(menuSectionSchema),
});

type MenuFormValues = z.infer<typeof menuSchema>;

interface MenuEditorProps {
  initialMenu?: Menu;
  onSave: (menu: Menu) => void;
}

export function MenuEditor({ initialMenu, onSave }: MenuEditorProps) {
  const defaultValues: MenuFormValues = initialMenu || {
    title: { en: '', es: '' },
    description: { en: '', es: '' },
    sections: [
      {
        title: { en: 'New Section', es: 'Nueva Sección' },
        items: [
          {
            name: { en: 'New Item', es: 'Nuevo Artículo' },
            description: { en: '', es: '' },
            price: '0.00',
          },
        ],
      },
    ],
  };

  const { control, handleSubmit, formState: { errors }, watch } = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues,
  });

  const onSubmit = (data: MenuFormValues) => {
    // Create a complete menu object with IDs and layout information
    const completeMenu: Menu = {
      id: initialMenu?.id || uuidv4(),
      ...data,
      sections: data.sections.map(section => ({
        id: uuidv4(),
        ...section,
        items: section.items.map(item => ({
          id: uuidv4(),
          ...item,
        })),
      })),
      layout: initialMenu?.layout || {
        orientation: 'portrait',
        paperSize: '8.5x11',
        columns: 1,
        margins: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
      },
      displayLanguages: initialMenu?.displayLanguages || { en: true, es: true },
    };
    
    onSave(completeMenu);
  };

  const [activeTab, setActiveTab] = useState<'en' | 'es'>('en');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex space-x-2 mb-4">
        <Button
          type="button"
          variant={activeTab === 'en' ? 'default' : 'outline'}
          onClick={() => setActiveTab('en')}
        >
          English
        </Button>
        <Button
          type="button"
          variant={activeTab === 'es' ? 'default' : 'outline'}
          onClick={() => setActiveTab('es')}
        >
          Spanish
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Menu Title</label>
            <Controller
              name={`title.${activeTab}`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder={`Menu title in ${activeTab === 'en' ? 'English' : 'Spanish'}`} />
              )}
            />
            {errors.title?.[activeTab] && (
              <p className="text-sm text-red-500">{errors.title[activeTab]?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Menu Description</label>
            <Controller
              name={`description.${activeTab}`}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder={`Menu description in ${activeTab === 'en' ? 'English' : 'Spanish'}`}
                  rows={3}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Menu Sections</h3>
        
        {watch('sections').map((section, sectionIndex) => (
          <Card key={sectionIndex} className="border border-gray-200">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Section {sectionIndex + 1}</CardTitle>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    // Remove section logic would go here
                  }}
                >
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Title</label>
                <Controller
                  name={`sections.${sectionIndex}.title.${activeTab}`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder={`Section title in ${activeTab === 'en' ? 'English' : 'Spanish'}`} />
                  )}
                />
                {errors.sections?.[sectionIndex]?.title?.[activeTab] && (
                  <p className="text-sm text-red-500">{errors.sections[sectionIndex]?.title?.[activeTab]?.message}</p>
                )}
              </div>

              {/* Items */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Menu Items</h4>
                
                {watch(`sections.${sectionIndex}.items`).map((item, itemIndex) => (
                  <Card key={itemIndex} className="border border-gray-100">
                    <CardContent className="space-y-3 p-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Item Name</label>
                        <Controller
                          name={`sections.${sectionIndex}.items.${itemIndex}.name.${activeTab}`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} placeholder={`Item name in ${activeTab === 'en' ? 'English' : 'Spanish'}`} />
                          )}
                        />
                        {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.name?.[activeTab] && (
                          <p className="text-sm text-red-500">
                            {errors.sections[sectionIndex]?.items?.[itemIndex]?.name?.[activeTab]?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Item Description</label>
                        <Controller
                          name={`sections.${sectionIndex}.items.${itemIndex}.description.${activeTab}`}
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              placeholder={`Item description in ${activeTab === 'en' ? 'English' : 'Spanish'}`}
                              rows={2}
                            />
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Price</label>
                        <Controller
                          name={`sections.${sectionIndex}.items.${itemIndex}.price`}
                          control={control}
                          render={({ field }) => (
                            <Input {...field} placeholder="0.00" />
                          )}
                        />
                        {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.price && (
                          <p className="text-sm text-red-500">
                            {errors.sections[sectionIndex]?.items?.[itemIndex]?.price?.message}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            // Remove item logic would go here
                          }}
                        >
                          Remove Item
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Add item logic would go here
                  }}
                >
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            // Add section logic would go here
          }}
        >
          Add Section
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Menu</Button>
      </div>
    </form>
  );
}
