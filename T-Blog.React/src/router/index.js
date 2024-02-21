import AuthRoute from "../components/AuthRoute";
import Login from "../pages/Login";
import EFEM from '../pages/EFEM'
import { createBrowserRouter } from 'react-router-dom'
import Shell from "../pages/Shell";
import Recipe from "../pages/Recipe";
import SEM from "../pages/SEM";
import Alarm from "../pages/Alarm";
import Config from "../pages/Config";
import Article from "../pages/Article";
import Publish from "../pages/Pub";
import Home from "../pages/Home";
const router =createBrowserRouter([{
    path: '/',
    element: <AuthRoute><Shell></Shell></AuthRoute>,
    children:[{
        path:'efem',
        element:<EFEM/>,
    },
    {
        path:'recipe',
        element:<Recipe/>
    },
    {
        path:'sem',
        element:<SEM/>
    },
    {
        path:'alarm',
        element:<Alarm/>
    },
    {
        path:'config',
        element:<Config/>
    },
    {
        path:'article',
        element:<Article/>
    },
    {
        path:'publish',
        element:<Publish/>
    },
    {
        path:'home',
        element:<Home/>
    }
]
},{
    path:'/login',
    element:<Login/>
}
])
export default router;