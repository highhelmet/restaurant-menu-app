"use client";

import React from 'react';
import { TestMenuPreview } from '@/components/menu/TestMenuPreview';
import { TestSuite } from '@/components/menu/TestSuite';
import { Menu } from '@/types/menu';

interface TestingDashboardProps {
  menu: Menu;
}

export function TestingDashboard({ menu }: TestingDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testing Dashboard</h2>
      </div>
      
      <TestMenuPreview menu={menu} />
      <TestSuite menu={menu} />
    </div>
  );
}
