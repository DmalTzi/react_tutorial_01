import { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from "../services/authorize"

const EditComponent = (props) =>{
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title, author, slug} = state
    const inputValue = name => event => {
         setState({...state,[name]:event.target.value})
    }

    const [content, setContent] = useState('')

    const submitcontent = (event) =>{
        setContent(event)
    }

    const submitForm=(e)=>{
        e.preventDefault();
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`,{title, content, author},{headers:{authorization:`Bearer ${getToken()}`}})
        .then(response=>{
            const {title, content, author,slug} = response.data
            Swal.fire("แจ้งเตือน","แก้ไขบทความเรียบร้อย","success")
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>{
            Swal.fire("แจ้งเตือน",err.response.data.error,"error")
        })
    }

    const findBlog=async()=>{
        try{
            const respone = await axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            const {title, content,author,slug} = respone.data
            setState({...state,title,author,slug})
            setContent(content)
        }catch(err){
            Swal.fire("แจ้งเตือน",err.response.data.error,"error")
        }
    }

    const showUpdateForm = () =>(
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
                <input type="submit" value="อัพเดท" className="btn btn-primary"/>
            </form>
    )

    useEffect(()=>{
        findBlog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    )
}

export default EditComponent;