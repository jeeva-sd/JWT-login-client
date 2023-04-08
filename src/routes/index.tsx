import { Fragment, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import routes from "./routes";
import { RouteItem } from "./types";

const createRouter = (routes: RouteItem[]) => {
    const loadingText = <>Loading...</>;

    const wrapperElement = (route: RouteItem) => {
        const Loading: any = route.loading ? route.loading : loadingText;
        const Guard = route.guard ? route.guard : Fragment;
        const Layout = route.layout ? route.layout : Fragment;
        const Component = route.element;
        const props = route.elementProps;

        return <Guard>
            <Layout>
                <Suspense fallback={Loading}>
                    <Component {...props} />
                </Suspense>
            </Layout>
        </Guard>;
    };

    const wrapperRoutes = (routes: RouteItem[]) => {
        const routesWith: any[] = [];
        for (const route of routes) {
            routesWith.push({
                ...route,
                element: route.element ? wrapperElement(route) : undefined,
                children: route.children ? wrapperRoutes(route.children) : undefined
            });
        }

        return routesWith;
    };

    const router = createBrowserRouter([{
        element: <><Outlet /></>,
        children: wrapperRoutes(routes)
    }]);

    return router;
}

const router = createRouter(routes);

export const renderRouter = () => {
    return <RouterProvider router={router} />;
};