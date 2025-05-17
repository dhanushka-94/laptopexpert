import { NextResponse } from 'next/server';

// Define interface for API response items
interface ApiItem {
  id: string | number;
  category_name: string;
  [key: string]: any;
}

export async function GET(request: Request) {
  try {
    // Get the actual data from the real API
    const response = await fetch("https://erp.laptopexpert.lk/api/v1/ApiItemController/itemList", {
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
    
    const data = await response.json();
    
    // Make sure we have valid data
    if (!data || !data.data || !Array.isArray(data.data)) {
      return NextResponse.json(
        { error: 'Invalid data format from external API' }, 
        { status: 500 }
      );
    }
    
    // Extract unique categories
    const categories = data.data.reduce((uniqueCategories: string[], item: ApiItem) => {
      if (item.category_name && !uniqueCategories.includes(item.category_name)) {
        uniqueCategories.push(item.category_name);
      }
      return uniqueCategories;
    }, []);
    
    // Format categories into objects with id and name
    const formattedCategories = categories.map((name: string, index: number) => ({
      id: index + 1,
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }));
    
    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Error in categories API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories from external API' }, 
      { status: 500 }
    );
  }
} 