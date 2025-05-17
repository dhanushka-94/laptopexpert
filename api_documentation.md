# Laptop Expert ERP API Documentation

## Introduction
This document outlines the API endpoints available for product management in the Laptop Expert ERP system. These APIs allow you to programmatically retrieve, create, update, and delete product information.

## Base URL
```
https://erp.laptopexpert.lk/api/v1/
```

## Authentication
All API requests require authentication using an API token. This token must be included in the request body for each API call.

**API Token:** `110dbbfb-0b44-4590-9679-f075ef01057d`

## API Endpoints

### 1. Get All Products
Retrieves a list of all products in the system.

**Endpoint:**
```
GET /ApiItemController/itemList
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "api_auth_key": "110dbbfb-0b44-4590-9679-f075ef01057d"
}
```

**Sample Response:**
```json
{
  "status": 200,
  "data": [
    {
      "id": "1",
      "name": "Product 1",
      "code": "P001",
      "type": "General_Product",
      "sale_price": "150.00",
      "purchase_price": "100.00",
      "category_id": "1",
      "brand_id": "2",
      "photo": "product1.jpg",
      "alternative_name": "Alt Product 1"
    },
    {
      "id": "2",
      "name": "Product 2",
      "code": "P002",
      "type": "General_Product",
      "sale_price": "250.00",
      "purchase_price": "200.00",
      "category_id": "1",
      "brand_id": "2",
      "photo": "product2.jpg",
      "alternative_name": "Alt Product 2"
    }
  ]
}
```

### 2. Add Product
Creates a new product in the system.

**Endpoint:**
```
POST /ApiItemController/addItem
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "api_auth_key": "110dbbfb-0b44-4590-9679-f075ef01057d",
  "name": "New Product",
  "alternative_name": "Alt New Product",
  "type": "General_Product",
  "category_name": "Laptops",
  "brand_name": "Dell",
  "supplier_name": "Dell Distributor",
  "alert_quantity": "5",
  "unit_type": "Single Unit",
  "purchase_unit_name": "PCS",
  "sale_unit_name": "PCS",
  "conversion_rate": "1",
  "purchase_price": "100",
  "whole_sale_price": "120",
  "sale_price": "150",
  "description": "New product description",
  "warranty": "1",
  "warranty_type": "Year",
  "guarantee": "1",
  "guarantee_type": "Month",
  "photo": "new_product.png",
  "loyalty_point": "0",
  "opening_stock": "[{'iem_description':'','stock_quantity':'20','outlet_name':'Main Branch'}]",
  "tax_information": "[{'tax_field_name':'VAT','tax_field_percentage':'15'}]"
}
```

**Sample Response:**
```json
{
  "status": 200,
  "message": "Data inserted successful."
}
```

### 3. Get Product Details
Retrieves details of a specific product for editing.

**Endpoint:**
```
POST /ApiItemController/editItem
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "api_auth_key": "110dbbfb-0b44-4590-9679-f075ef01057d",
  "id": "1"
}
```

**Sample Response:**
```json
{
  "status": 200,
  "data": {
    "id": "1",
    "name": "Product 1",
    "code": "P001",
    "alternative_name": "Alt Product 1",
    "type": "General_Product",
    "category_id": "1",
    "brand_id": "2",
    "supplier_id": "3",
    "alert_quantity": "5",
    "unit_type": "1",
    "purchase_unit_id": "1",
    "sale_unit_id": "1",
    "conversion_rate": "1",
    "purchase_price": "100.00",
    "whole_sale_price": "120.00",
    "sale_price": "150.00",
    "description": "Product description",
    "warranty": "1",
    "warranty_date": "year",
    "guarantee": "1",
    "guarantee_date": "month",
    "photo": "product1.jpg",
    "loyalty_point": "0",
    "tax_information": "[{\"tax_field_id\":\"1\",\"tax_field_company_id\":\"1\",\"tax_field_name\":\"VAT\",\"tax_field_percentage\":\"15\"}]",
    "tax_string": "VAT:"
  }
}
```

### 4. Update Product
Updates an existing product.

**Endpoint:**
```
POST /ApiItemController/updateItem
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": "1",
  "api_auth_key": "110dbbfb-0b44-4590-9679-f075ef01057d",
  "name": "Updated Product",
  "alternative_name": "Alt Updated Product",
  "type": "General_Product",
  "category_name": "Laptops",
  "brand_name": "Dell",
  "supplier_name": "Dell Distributor",
  "alert_quantity": "5",
  "unit_type": "Single Unit",
  "purchase_unit_name": "PCS",
  "sale_unit_name": "PCS",
  "conversion_rate": "1",
  "purchase_price": "110",
  "whole_sale_price": "130",
  "sale_price": "160",
  "description": "Updated product description",
  "warranty": "2",
  "warranty_type": "Year",
  "guarantee": "2",
  "guarantee_type": "Month",
  "photo": "updated_product.png",
  "loyalty_point": "0",
  "opening_stock": "[{'iem_description':'','stock_quantity':'20','outlet_name':'Main Branch'}]",
  "tax_information": "[{'tax_field_name':'VAT','tax_field_percentage':'15'}]"
}
```

**Sample Response:**
```json
{
  "status": 200,
  "message": "Data updated successful."
}
```

### 5. Delete Product
Deletes a specific product.

**Endpoint:**
```
POST /ApiItemController/deleteItem
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "api_auth_key": "110dbbfb-0b44-4590-9679-f075ef01057d",
  "id": "1"
}
```

**Sample Response:**
```json
{
  "status": 200,
  "message": "Data has been deleted successfully."
}
```

## Error Responses

### Authentication Errors
```json
{
  "status": 500,
  "message": "API Key is not valid"
}
```

### Validation Errors
```json
{
  "status": 400,
  "message": {
    "name": "The Name field is required",
    "sale_price": "The Sale Price field is required",
    "category_name": "The Category Name field is required"
  }
}
```

### Not Found Errors
```json
{
  "status": 404,
  "message": "Item not found"
}
```

## Data Models

### Product Schema
| Field              | Type    | Description                                      | Required |
|--------------------|---------|--------------------------------------------------|----------|
| name               | string  | Product name                                     | Yes      |
| alternative_name   | string  | Alternative product name                         | No       |
| type               | string  | Product type (General_Product, IMEI_Product, etc)| Yes      |
| category_name      | string  | Category name                                    | Yes      |
| brand_name         | string  | Brand name                                       | No       |
| supplier_name      | string  | Supplier name                                    | No       |
| alert_quantity     | string  | Alert quantity for low stock                     | No       |
| unit_type          | string  | Unit type (Single Unit, Double Unit)             | Yes      |
| purchase_unit_name | string  | Purchase unit name                               | Depends* |
| sale_unit_name     | string  | Sale unit name                                   | Yes      |
| conversion_rate    | string  | Conversion rate between units                    | Depends* |
| purchase_price     | string  | Purchase price                                   | No       |
| whole_sale_price   | string  | Wholesale price                                  | No       |
| sale_price         | string  | Sale price                                       | Yes      |
| description        | string  | Product description                              | No       |
| warranty           | string  | Warranty period                                  | No       |
| warranty_type      | string  | Warranty type (Day, Month, Year)                 | No       |
| guarantee          | string  | Guarantee period                                 | No       |
| guarantee_type     | string  | Guarantee type (Day, Month, Year)                | No       |
| photo              | string  | Product image filename                           | No       |
| loyalty_point      | string  | Loyalty points earned                            | No       |
| opening_stock      | string  | JSON string with opening stock details           | No       |
| tax_information    | string  | JSON string with tax information                 | No       |

*Required if unit_type is "Double Unit"

## Notes
1. Make sure to replace the sample API token with your actual token
2. All requests must include the Content-Type header set to application/json
3. The API uses HTTP status codes to indicate success or failure of the request
4. The opening_stock and tax_information fields are JSON strings - ensure they are properly formatted

---

For additional support or information, please contact the Laptop Expert ERP system administrator.
