import { NextResponse } from 'next/server';

// Define interface for API response items
interface ApiItem {
  id: string | number;
  category_name: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  try {
    // Get the actual data from the new API
    const response = await fetch("https://api.erp.laptopexpert.lk/api/products", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status: ${response.status}` }, 
        { status: response.status }
      );
    }
    
    const apiResponse = await response.json();
    
    // Make sure we have valid data
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data) || apiResponse.status !== 'success') {
      return NextResponse.json(
        { error: 'Invalid data format from external API' }, 
        { status: 500 }
      );
    }
    
    // Extract unique categories
    const categories = apiResponse.data.reduce((uniqueCategories: string[], item: any) => {
      if (item.category_name && !uniqueCategories.includes(item.category_name)) {
        uniqueCategories.push(item.category_name);
      }
      return uniqueCategories;
    }, []);
    
    console.log(`Found ${categories.length} unique categories: ${JSON.stringify(categories)}`);
    
    // Format categories into objects with id and name
    const formattedCategories = categories.map((name: string, index: number) => {
      // Generate a consistent slug by removing special characters, and ensuring lowercase with hyphens
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
      
      return {
        id: index + 1,
        name: name,
        slug: slug
      };
    });
    
    console.log(`Formatted categories with slugs: ${JSON.stringify(formattedCategories)}`);
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error in categories API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories from external API' }, 
      { status: 500 }
    );
  }
} 