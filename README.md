# Aura Engine

A modern enterprise inventory management dashboard built with Next.js and React. Aura Engine is designed to handle large inventory datasets efficiently while providing fast search, filtering, sorting, analytics, and CSV export capabilities.

##  Overview

Aura Engine provides an enterprise-style interface for monitoring and managing inventory data.

The application focuses on performance and usability when working with large datasets, using server-side pagination and debounced search to prevent unnecessary browser workload.

##  Dashboard
![image alt](https://github.com/muskan2862/aura-engine/blob/99462ff9d5200ed7b5b179796d8fcd43bdfa8eaf/Screenshot%202026-08-10%20161544.png)

##  Inventory
![image alt](https://github.com/muskan2862/aura-engine/blob/7001ff5dd808c5c16fd0ffca4b051753baf262fc/Screenshot%202026-08-10%20161619.png)
![image alt]()

## Home 
![image alt]()


##  Features

###  Inventory Management
- Enterprise inventory data table
- Server-side pagination
- Displays up to 50 records per page
- Sticky table headers
- Responsive table layout
- Loading and empty states

###  Search & Filtering
- Global inventory search
- 500ms debounced search
- Search by:
  - Product name
  - SKU
  - Category
- Category filtering
- Stock-level filtering
- Minimum and maximum price filtering
- Reset filters functionality

### ↕ Sorting
- Sort inventory by price
- Ascending and descending sorting
- Server-side sorting through API parameters

###  Analytics Dashboard
- Total SKU count
- Total inventory value
- Out-of-stock item count
- Restock Priority chart
- Top 10 lowest-stock products
- Portfolio Distribution chart
- Inventory valuation by category

###  CSV Export
- Export currently filtered inventory data
- Generates CSV directly in the browser
- Automatic file download
- Proper CSV escaping for commas, quotes, and line breaks

###  UI & UX
- Responsive design
- Mobile-friendly navigation
- Professional enterprise dashboard interface
- Responsive charts and tables

##  Tech Stack

- **Next.js**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Recharts**
- **REST API**
- **URLSearchParams**
- **Git & GitHub**

##  Architecture

```text
Aura Engine
│
├── Dashboard
│   ├── KPI Cards
│   ├── Restock Priority
│   └── Portfolio Distribution
│
├── Inventory
│   ├── Search
│   ├── Filters
│   ├── Sorting
│   ├── Pagination
│   └── CSV Export
│
├── API
│   ├── Inventory API
│   └── Inventory Summary API
│
├── Services
│   └── Inventory Service
│
├── Features
│   ├── Dashboard
│   └── Inventory
│
└── Utilities
    └── CSV Export
