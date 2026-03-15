import { createBrowserRouter, RouterProvider } from "react-router"
import Root from "./Root.jsx"
import ErrorPage from "../pages/ErrorPage.jsx"
import Clicker from "../pages/Clicker.jsx"
import Store from "../pages/Store.jsx"
import Settings from "../pages/Settings.jsx"

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
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter
