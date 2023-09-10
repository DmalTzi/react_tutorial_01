import { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { authenticate, getUser } from "../services/authorize"
import {withRouter} from "react-router-dom"

const LoginComponent=(props)=>{
    const [state,setState] = useState({
        username:"",
        password:"",
    })

    const {username, password} = state

    const inputValue = name => event => {
        setState({...state,[name]:event.target.value})
   }

    const submitForm=async(e)=>{
        e.preventDefault()
        try{
            const login = await axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
            Swal.fire("แจ้งเตือน","เข้าสู่ระบบสำเร็จ","success")
            authenticate(login, ()=>props.history.push("/create"))
        }catch(err){
            Swal.fire("แจ้งเตือน",err.response.data.err,"error")
        }
    }

    useEffect(()=>{
        getUser() && props.history.push("/")
         // eslint-disable-next-line
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เข้าสู่ระบบ | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" 
                        value={username} 
                        onChange={inputValue("username")}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" 
                        value={password} 
                        onChange={inputValue("password")}/>
                </div>
                <br/>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default withRouter(LoginComponent)