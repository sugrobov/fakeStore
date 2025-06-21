import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";

export const routesConfig = (props) => [
    {
        path: '/',
        element: <ProductList {...props} />,
        // exact: true
    },
    {
        path: '/product/:id',
        element: <ProductDetail />,
        // exact: true
    },
    {
        path: '/link2',
        element: "tangomashik",
        // exact: true
    },
    {
        path: '/link3',
        element: "teplomashik",
        // exact: true
    }
]