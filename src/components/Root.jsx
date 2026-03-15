import Menu from './Menu.jsx'
import { Outlet } from "react-router"

function Root(props) {
    return (
        <div className="root">
            <div className="root_content">
                <Outlet />
            </div>
            <Menu items={props.items}/>
        </div>
    )
}

export default Root
