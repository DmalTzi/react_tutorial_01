import {Link, withRouter} from "react-router-dom"
import { getUser, logout} from "../services/authorize"
const NavbarComponet = ({history}) => {
    return(
        <nav>
            <ul className="nav nav-tab">
                <li className="nav-item pr-3 pt-3 pb-3"><Link to={`${process.env.REACT_APP_DEFAULE_PATH}/`} className="nav-link">หน้าแรก</Link></li>
                {getUser() && (<li className="nav-item pr-3 pt-3 pb-3"><Link to={`${process.env.REACT_APP_DEFAULE_PATH}/create`} className="nav-link">เขียนบทความ</Link></li>)}
                {!getUser() && (<li className="nav-item pr-3 pt-3 pb-3"><Link to={`${process.env.REACT_APP_DEFAULE_PATH}/login`} className="nav-link">เข้าสู่ระบบ</Link></li>)}
                {getUser() && (<li className="nav-item pr-3 pt-3 pb-3"><button className="nav-link" onClick={()=>logout(()=>history.push(`${process.env.REACT_APP_DEFAULE_PATH}/`))}>ออกจากระบบ</button></li>)}
            </ul>
        </nav>
    )
}

export default withRouter(NavbarComponet)