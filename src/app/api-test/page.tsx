"use client";

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ApiTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Use our proxy endpoint instead of direct API call
        const response = await fetch("/api/proxy");
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching API data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">API Data Test</h1>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading API data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
              <h2 className="font-semibold mb-2">API Endpoint:</h2>
              <code className="bg-blue-100 p-1 rounded">https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList</code>
              <p className="text-sm text-gray-600 mt-1">(Accessed via server-side proxy to avoid CORS issues)</p>
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Status:</h2>
              <div className="bg-green-100 p-2 rounded inline-block">
                {data?.status ? `${data.status}` : 'Unknown'}
              </div>
            </div>
            
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Total Items:</h2>
              <div className="bg-gray-100 p-2 rounded inline-block">
                {data?.data ? data.data.length : 0}
              </div>
            </div>
            
            <h2 className="font-semibold mt-6 mb-3">Raw API Response:</h2>
            <div className="bg-gray-50 p-4 rounded border overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 