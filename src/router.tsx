import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import Home from './routes/Home.tsx'
import About from './routes/About.tsx'
import Contact from './routes/Contact.tsx'

// Define root route
const rootRoute = createRootRoute({ component: App })

// Define child routes
const homeRoute = createRoute({ path: '/', getParentRoute: () => rootRoute, component: Home })
const aboutRoute = createRoute({ path: '/about', getParentRoute: () => rootRoute, component: About })
const contactRoute = createRoute({ path: '/contact', getParentRoute: () => rootRoute, component: Contact })

// Create the router
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute, contactRoute]),
})

export default router
