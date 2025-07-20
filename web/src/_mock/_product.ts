// Gender options removed - not applicable for electronics and furniture
export const PRODUCT_GENDER_OPTIONS: never[] = [];

export const PRODUCT_CATEGORY_OPTIONS = ['Electronics', 'Home & Garden', 'Books'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#FF4842',
  '#1890FF',
  '#FFC0CB',
  '#00AB55',
  '#FFC107',
  '#7F00FF',
  '#000000',
  '#FFFFFF',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: '#FF4842', label: 'Red' },
  { value: '#1890FF', label: 'Blue' },
  { value: '#FFC0CB', label: 'Pink' },
  { value: '#00AB55', label: 'Green' },
  { value: '#FFC107', label: 'Yellow' },
  { value: '#7F00FF', label: 'Violet' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  // Electronics
  { value: '32GB', label: '32GB' },
  { value: '64GB', label: '64GB' },
  { value: '128GB', label: '128GB' },
  { value: '256GB', label: '256GB' },
  { value: '512GB', label: '512GB' },
  { value: '1TB', label: '1TB' },
  // Screens
  { value: '13-inch', label: '13-inch' },
  { value: '15-inch', label: '15-inch' },
  { value: '16-inch', label: '16-inch' },
  { value: '24-inch', label: '24-inch' },
  { value: '27-inch', label: '27-inch' },
  { value: '32-inch', label: '32-inch' },
  // Furniture sizes
  { value: 'Small', label: 'Small' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Large', label: 'Large' },
  { value: 'Extra Large', label: 'Extra Large' },
  // Specific furniture dimensions
  { value: '2-seater', label: '2-seater' },
  { value: '4-seater', label: '4-seater' },
  { value: '6-seater', label: '6-seater' },
  { value: '8-seater', label: '8-seater' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: 'In stock' },
  { value: 'low stock', label: 'Low stock' },
  { value: 'out of stock', label: 'Out of stock' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  { group: 'Electronics', classify: ['Smartphones', 'Laptops', 'Tablets', 'Monitors', 'Accessories'] },
  { group: 'Home & Garden', classify: ['Furniture', 'Decor', 'Kitchen', 'Bedroom', 'Living Room'] },
  { group: 'Books', classify: ['Fiction', 'Non-Fiction', 'Technical', 'Educational', 'Reference'] },
];
