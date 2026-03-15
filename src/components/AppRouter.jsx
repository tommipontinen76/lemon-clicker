import { createBrowserRouter, RouterProvider } from "react-router"
import Root from "./Root"
import ErrorPage from '../assets/pages/ErrorPage'
import Clicker from '../assets/pages/Clicker'
import Store from '../assets/pages/Store'
import Settings from '../assets/pages/Settings'

function AppRouter(props) {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root items={props.stats.itemstobuy}/>,
            errorElement: <ErrorPage/>,
            children: [
                {path: "", element: <Clicker stats={props.stats} handleClick={props.handleClick}/>},
                {path: "store", element: <Store stats={props.stats}/>},
                {path: "settings", element: <Settings stats={props.stats}/>},
            ]
        }

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
