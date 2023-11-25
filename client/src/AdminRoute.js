import { getUser } from "./services/authorize";
import { Route,Redirect } from "react-router-dom";

const AdminRoute=({component:Component,...rest})=>(
    <Route 
        {...rest}
        render={props=>
            getUser() ? 
            (<Component {...props}/>) :
            (<Redirect 
                to={{pathname:`${process.env.REACT_APP_DEFAULE_PATH}/login`,state:{from:props.location}}}
                />
            )
        } 
    />
);

export default AdminRoute