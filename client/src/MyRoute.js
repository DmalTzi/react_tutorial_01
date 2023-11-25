import {BrowserRouter, Switch, Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import AdminRoute from "./AdminRoute"


const MyRoute = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path={`${process.env.REACT_APP_DEFAULE_PATH}/`} exact component={App}/>
                <AdminRoute path={`${process.env.REACT_APP_DEFAULE_PATH}/create`} exact component={FormComponent}/>
                <Route path={`${process.env.REACT_APP_DEFAULE_PATH}/blog/:slug`} exact component={SingleComponent}/>
                <AdminRoute path={`${process.env.REACT_APP_DEFAULE_PATH}/blog/edit/:slug`} exact component={EditComponent}/>
                <Route path={`${process.env.REACT_APP_DEFAULE_PATH}/login`} exact component={LoginComponent}/>
            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute