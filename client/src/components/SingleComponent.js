import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import NavbarComponent from "./NavbarComponent"
const parse = require('html-react-parser');


const SingleComponent=(props)=>{

    const [blog, setBlog] = useState('')

    const findBlog=async()=>{
        try{
            const gatdata = await axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            setBlog(gatdata.data)
        }catch(err){
            Swal.fire("แจ้งเตือน",err.response.data.error,"error")
        }
    }

    useEffect(()=>{
        findBlog()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div className="container p-5">
            <NavbarComponent/>
            {blog && 
            <div>
                <h1>{blog.title}</h1>
                <div className="pt-3">{parse(blog.content)}</div>
                <p className="text-muted"> ผู้เขียน: {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            </div>}
        </div>
    )
}

export default SingleComponent