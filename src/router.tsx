import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App';
import Home from './routes/Home.tsx';
import About from './routes/About.tsx';
import Contact from './routes/Contact.tsx';
import ItemDetail from './routes/ItemDetails.tsx';

// Define root route
const rootRoute = createRootRoute({ component: App });

// Define child routes
const homeRoute = createRoute({ path: '/', getParentRoute: () => rootRoute, component: Home });
const aboutRoute = createRoute({ path: '/about', getParentRoute: () => rootRoute, component: About });
const categoryRoute = createRoute({ path: '/about/category/$category', getParentRoute: () => rootRoute, component: About });
const itemDetailRoute = createRoute({ path: '/about/category/$category/item/$id', getParentRoute: () => rootRoute, component: ItemDetail });
const contactRoute = createRoute({ path: '/contact', getParentRoute: () => rootRoute, component: Contact });

// Create the router
const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute, categoryRoute, itemDetailRoute, contactRoute]),
  basepath: '/insect-betyar',
});

export default router;