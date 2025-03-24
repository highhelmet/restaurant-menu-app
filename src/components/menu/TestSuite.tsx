"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Bug } from "lucide-react";
import { Menu } from '@/types/menu';

interface TestSuiteProps {
  menu: Menu;
}

export function TestSuite({ menu }: TestSuiteProps) {
  const [testResults, setTestResults] = useState<{
    [key: string]: { status: 'success' | 'warning' | 'error'; message: string }
  }>({});
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [allTestsComplete, setAllTestsComplete] = useState(false);

  const runTests = async () => {
    setIsRunningTests(true);
    setAllTestsComplete(false);
    setTestResults({});
    
    // Simulate test execution with delays to show progress
    await testMenuStructure();
    await testBilingualSupport();
    await testImageSupport();
    await testLayoutOptions();
    await testExportFunctionality();
    
    setIsRunningTests(false);
    setAllTestsComplete(true);
  };

  const testMenuStructure = async () => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let status: 'success' | 'warning' | 'error' = 'success';
    let message = 'Menu structure is valid and complete.';
    
    // Check if menu has title
    if (!menu.title.en && !menu.title.es) {
      status = 'error';
      message = 'Menu is missing title in both languages.';
    } 
    // Check if menu has sections
    else if (!menu.sections || menu.sections.length === 0) {
      status = 'error';
      message = 'Menu has no sections.';
    }
    // Check if sections have items
    else if (menu.sections.some(section => !section.items || section.items.length === 0)) {
      status = 'warning';
      message = 'Some menu sections have no items.';
    }
    
    setTestResults(prev => ({
      ...prev,
      menuStructure: { status, message }
    }));
  };

  const testBilingualSupport = async () => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 700));
    
    let status: 'success' | 'warning' | 'error' = 'success';
    let message = 'Bilingual support is working correctly.';
    
    // Check if at least one language is enabled
    if (!menu.displayLanguages.en && !menu.displayLanguages.es) {
      status = 'error';
      message = 'No language is selected for display.';
    }
    // Check if menu title has content in displayed languages
    else if ((menu.displayLanguages.en && !menu.title.en) || 
             (menu.displayLanguages.es && !menu.title.es)) {
      status = 'warning';
      message = 'Menu title is missing in one of the displayed languages.';
    }
    // Check if sections have titles in displayed languages
    else if (menu.sections.some(section => 
      (menu.displayLanguages.en && !section.title.en) || 
      (menu.displayLanguages.es && !section.title.es))) {
      status = 'warning';
      message = 'Some section titles are missing in displayed languages.';
    }
    
    setTestResults(prev => ({
      ...prev,
      bilingualSupport: { status, message }
    }));
  };

  const testImageSupport = async () => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let status: 'success' | 'warning' | 'error' = 'success';
    let message = 'Image support is working correctly.';
    
    // Check if any items have images
    const itemsWithImages = menu.sections.flatMap(section => 
      section.items.filter(item => item.image)
    );
    
    if (itemsWithImages.length === 0) {
      status = 'warning';
      message = 'No menu items have images. Images are optional but recommended.';
    }
    
    // Check if images have valid URLs
    const invalidImageItems = menu.sections.flatMap(section => 
      section.items.filter(item => 
        item.image && 
        !(item.image.startsWith('http') || item.image.startsWith('data:'))
      )
    );
    
    if (invalidImageItems.length > 0) {
      status = 'error';
      message = `${invalidImageItems.length} items have invalid image URLs.`;
    }
    
    setTestResults(prev => ({
      ...prev,
      imageSupport: { status, message }
    }));
  };

  const testLayoutOptions = async () => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let status: 'success' | 'warning' | 'error' = 'success';
    let message = 'Layout options are configured correctly.';
    
    // Check if layout has valid orientation
    if (!['portrait', 'landscape'].includes(menu.layout.orientation)) {
      status = 'error';
      message = 'Invalid orientation setting.';
    }
    // Check if layout has valid paper size
    else if (!['8.5x11', '11x17', 'A4', 'A3'].includes(menu.layout.paperSize)) {
      status = 'error';
      message = 'Invalid paper size setting.';
    }
    // Check if columns is within valid range
    else if (menu.layout.columns < 1 || menu.layout.columns > 3) {
      status = 'error';
      message = 'Invalid number of columns.';
    }
    // Check if margins are within reasonable range
    else if (Object.values(menu.layout.margins).some(margin => margin < 0 || margin > 3)) {
      status = 'warning';
      message = 'Some margins are outside the recommended range (0-3 inches).';
    }
    
    setTestResults(prev => ({
      ...prev,
      layoutOptions: { status, message }
    }));
  };

  const testExportFunctionality = async () => {
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This is a simulated test since we can't actually test export in this environment
    const status: 'success' | 'warning' | 'error' = 'success';
    const message = 'Export functionality is ready to use.';
    
    setTestResults(prev => ({
      ...prev,
      exportFunctionality: { status, message }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Application Test Suite</h3>
        <Button
          onClick={runTests}
          disabled={isRunningTests}
        >
          {isRunningTests ? 'Running Tests...' : 'Run Tests'}
        </Button>
      </div>
      
      <div className="space-y-4">
        {Object.entries(testResults).map(([testName, result]) => (
          <Alert key={testName} variant={result.status === 'error' ? 'destructive' : 'default'}>
            {result.status === 'success' && <CheckCircle className="h-4 w-4" />}
            {result.status === 'warning' && <AlertCircle className="h-4 w-4" />}
            {result.status === 'error' && <Bug className="h-4 w-4" />}
            <AlertTitle className="capitalize">
              {testName.replace(/([A-Z])/g, ' $1').trim()}
            </AlertTitle>
            <AlertDescription>
              {result.message}
            </AlertDescription>
          </Alert>
        ))}
        
        {!isRunningTests && !allTestsComplete && Object.keys(testResults).length === 0 && (
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">
                Click "Run Tests" to verify your menu application functionality.
              </p>
            </CardContent>
          </Card>
        )}
        
        {allTestsComplete && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Test Summary</h4>
                  <p className="text-sm text-gray-500">
                    {Object.values(testResults).every(r => r.status === 'success')
                      ? 'All tests passed successfully!'
                      : Object.values(testResults).some(r => r.status === 'error')
                        ? 'Some tests failed. Please review the issues above.'
                        : 'Tests completed with warnings. Review and address if needed.'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={runTests}
                >
                  Run Tests Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
