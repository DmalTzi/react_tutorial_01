import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import {usestate,useEffect} from "react"

function App() {

  const [blogs, setBlogs] = usestate([])

  return (
    <div className="container p-5">
      <NavbarComponent/>
      
    </div>
  );
}

export default App;
