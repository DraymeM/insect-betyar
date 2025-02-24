import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import Home from './routes/Home.tsx'
import About from './routes/About.tsx'
import Contact from './routes/Contact.tsx'
import ItemDetail from './routes/ItemDetails.tsx' // Import the item detail page

// Define root route
const rootRoute = createRootRoute({ component: App })

// Define child routes
const homeRoute = createRoute({ path: '/', getParentRoute: () => rootRoute, component: Home })
const aboutRoute = createRoute({ path: '/about', getParentRoute: () => rootRoute, component: About })
const contactRoute = createRoute({ path: '/contact', getParentRoute: () => rootRoute, component: Contact })
const itemDetailRoute = createRoute({ 
  path: '/about/item/$id', // Define the dynamic segment
  getParentRoute: () => rootRoute, 
  component: ItemDetail 
})

// Create the router
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute, contactRoute, itemDetailRoute]),
  basepath: '/insect-betyar', // Matches Vite's base
})

export default router
