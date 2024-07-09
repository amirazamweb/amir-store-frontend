import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/admin/AdminPanel';
import UserPanel from '../pages/user/UserPanel';
import AllUsers from '../pages/admin/AllUsers';
import AllProducts from '../pages/admin/AllProducts';
import ProductCategory from '../pages/ProductCategory';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import AllOrders from '../pages/admin/AllOrders';
import ResetPassword from '../pages/ResetPassword';
import UserOrder from '../pages/user/UserOrder';
import AdminPersonalOrder from '../pages/admin/AdminPersonalOrder';

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"reset-password",
                element:<ResetPassword/>
            },
            {
                path:"signup",
                element:<SignUp/>
            },
            {
                path:"user",
                element:<UserPanel/>,
                children:[
                    {
                        path:'user-order',
                        element:<UserOrder/>
                    }
                ]
            },
            {
                path:"admin",
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element: <AllUsers/>
                    },
                    {
                        path:'all-products',
                        element: <AllProducts/>
                    },
                    {
                        path:'all-orders',
                        element: <AllOrders/>
                    },
                    {
                        path:'admin-order',
                        element: <AdminPersonalOrder/>
                    }
                ]
            },
            {
                path:"product-category",
                element:<ProductCategory/>,
            },
            {
                path:"product-detail/:id",
                element:<ProductDetail/>,
            },
            {
                path:"cart",
                element:<Cart/>,
            },
            {
                path:"search",
                element:<SearchProduct/>,
            }
        ]
    }
])

export default router;