# Mock Category System

This is a local mock system for category CRUD operations that stores data in localStorage.

## Features

✅ **Full CRUD Operations**
- Create new categories
- Read/List categories
- Update existing categories  
- Delete single or multiple categories

✅ **Data Persistence**
- Data persists during browser session
- Stored in localStorage
- Resets when app rebuilds or restarts

✅ **Mock Data**
- Pre-populated with 5 sample categories
- Realistic data with descriptions and images
- Various statuses (published/draft, active/inactive)

## Usage

The mock system is already integrated into:

- `src/sections/category/view/category-list-view.tsx` - Uses mock data
- `src/sections/category/category-new-edit-form.tsx` - Creates/updates with mock API
- `src/app/dashboard/category/[id]/page.tsx` - Details page uses mock data
- `src/app/dashboard/category/[id]/edit/page.tsx` - Edit page uses mock data

## API Reference

```typescript
import { categoryMockAPI } from 'src/actions/category-mock';

// Create category
const newCategory = categoryMockAPI.create(data);

// Update category
const updated = categoryMockAPI.update(id, data);

// Delete category
const success = categoryMockAPI.delete(id);

// Delete multiple
const deletedCount = categoryMockAPI.deleteMany([id1, id2]);

// Reset to defaults
categoryMockAPI.reset();

// Get all categories
const all = categoryMockAPI.getAll();
```

## Data Storage

- **Key**: `mock-categories`
- **Location**: `localStorage`
- **Reset**: Clear localStorage or restart app
- **Fallback**: Uses `_categories` from `src/_mock/category.ts`

## Switching Back to Real API

To use real API instead of mock:

1. Change imports in list view:
   ```typescript
   // From:
   import { useGetCategories } from 'src/actions/category-mock';
   
   // To:
   import { useGetCategories } from 'src/actions/category';
   ```

2. Update form to use real API endpoints
3. Update page loaders to use real API calls 