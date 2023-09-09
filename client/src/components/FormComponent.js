import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser , getToken} from "../services/authorize"

const FormComponent = () =>{
    const [state,setState] = useState({
        title:"",
        author:getUser(),
    })
    const {title, author} = state

    const [content, setContent] = useState('')

    //assign value for state
    const inputValue = name => event => {
         setState({...state,[name]:event.target.value})
    }

    const submitcontent = (event) =>{
        setContent(event)
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        try{
            await axios
            .post(`${process.env.REACT_APP_API}/create`,{title, content, author},{headers:{authorization:`Bearer ${getToken()}`}})
            Swal.fire("แจ้งเตือน","บันทึกข้อมูลเรียบร้อย","success")
            setState({...state,title:"",author:""})
            setContent("")
        }catch(err){
            Swal.fire("แจ้งเตือน","ไม่สามารถบันทึกข้อมูลได้","error")
        }
    }

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill
                    value={content}
                    onChange={submitcontent}
                    className="pb-5 mb-3"
                    placeholder="เขียนรายละเอียดบทความของคุณ"
                    style={{border:'1px solid black'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author} 
                        onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default FormComponent;