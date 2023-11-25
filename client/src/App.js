import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import {useState,useEffect} from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { getUser ,getToken} from "./services/authorize";
const parse = require('html-react-parser');

function App() {

  const [blogs, setBlogs] = useState([])

  const fetchData=async()=>{
    try{
      const respone = await axios.get(`${process.env.REACT_APP_API}/blogs`)
      setBlogs(respone.data)
    }catch(err){
      console.log(err)
      // Swal.fire("Alert",err.response.data.error,"error")
    }
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=async(slug)=>{
    try{
      const alert_delete = await Swal.fire({title:"คุณต้องการลบบทความหรือไม่",icon:"warning",showCancelButton:true})
      if(alert_delete.isConfirmed){
        deleteBlog(slug)
      }
    }catch(err){
      Swal.fire("Alert",err.respone.data.error,"error")
    }
  }

  const deleteBlog=async(slug)=>{
    try{
      const delete_blog = await axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,{headers:{authorization:`Bearer ${getToken()}`}})
      if (delete_blog.status === 200){
        Swal.fire("Deleted!","ลบบทความเรียบร้อย","success")
        fetchData()
      }
    }catch(err){
      Swal.fire("Deleted",err.respone.data.error,"error")
    }
  }  

  return (
    <div className="container p-5">
      <NavbarComponent/>
      <h1>หน้าแรก</h1>
      {blogs.map((blog,index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div className="pt-3"><p>{parse(blog.content.substring(0,250))}........</p></div>
            <p className="text-muted">ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            {getUser() && <div>
              <Link className="btn btn-outline-success" to={`${process.env.REACT_APP_DEFAULE_PATH}/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link> &nbsp;
              <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
            </div>
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
