import { useState } from "react"
import NavbarComponent from "./NavbarComponent"

const FormComponent = () =>{
    const [state,setState] = useState({
        title:"",
        content:"",
        author:"",
    })
    const {title, content, author} = state
    //assign value for state
    const inputValue = name => event => {
         console.log(name,"=",event.target.value)
         setState({...state,[name]:event.target.value})
    }
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            {JSON.stringify(state)}
            <form>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea className="form-control" 
                        value={content} 
                        onChange={inputValue("content")}></textarea>
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author} 
                        onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submin" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default FormComponent;