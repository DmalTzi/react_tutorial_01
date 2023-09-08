import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import {useState,useEffect} from "react"
import { Link } from "react-router-dom"

function App() {

  const [blogs, setBlogs] = useState([])

  const fetchData=async()=>{
    await axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(respone=>{
        setBlogs(respone.data)
      })
      .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])

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
            <p>{blog.content.substring(0,180)}...</p>
            <p className="text-muted">ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
