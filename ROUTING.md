# Project Routing Structure

## Overview
This project uses React Router v7 with a nested routing structure that provides a consistent layout across all pages.

## Route Structure

### Main Routes
- `/` - Home page (Dashboard with overview components)
- `/station-master` - Station Master management page
- `/asset-master` - Asset Master management page
- `*` - Catch-all route for 404 errors

## Layout Components

### MainLayout
- Wraps the entire application
- Provides the main container structure
- Integrates with DashboardLayout

### DashboardLayout
- Provides the persistent sidebar and topbar
- Handles the collapsible sidebar functionality
- Renders child routes in the main content area
- Uses Material-UI components for the layout

### Navigation
- **Sidebar**: Contains navigation links to all main pages
- **Topbar**: Contains search, notifications, and user profile
- **Breadcrumbs**: Shows current page location

## Component Structure

```
src/
├── App2.js                 # Main routing configuration
├── Layout/
│   ├── MainLayout.js       # Main layout wrapper
│   └── ErrorPage.js        # Error handling component
├── AppLayout/
│   └── DashboardLayout.js  # Dashboard layout with sidebar
├── pages/
│   └── Home.js            # Home page component
└── components/
    ├── Sidebar/            # Navigation sidebar
    ├── Topbar/             # Top navigation bar
    ├── StationMaster/      # Station master page
    └── AssetMaster/        # Asset master page
```

## Key Features

1. **Persistent Sidebar**: Collapsible sidebar that maintains state
2. **Responsive Design**: Layout adapts to different screen sizes
3. **Error Handling**: Comprehensive error pages for different HTTP status codes
4. **Navigation**: Easy navigation between different sections
5. **Layout Consistency**: All pages share the same header and sidebar

## Usage

The routing is configured in `src/App2.js` using React Router's `createBrowserRouter`. The `MainLayout` component wraps all routes and provides the consistent layout structure. Each route renders its content within the `DashboardLayout` component, which handles the sidebar and topbar.

## Adding New Routes

To add a new route:

1. Add the route to the `myRouter` configuration in `App2.js`
2. Create the component in the appropriate directory
3. Add navigation link to the sidebar if needed
4. Ensure the component follows the established layout patterns
