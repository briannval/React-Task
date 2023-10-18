import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import About from "./about";
import logo from "../logo.png"
import Mobile from "./mobile";
import Home from "./home";
const Routing = () => {
  const [access,setaccess] = useState(0)
  const [user,setuser] = useState("Login")
  const [pathway,setpathway] = useState("/mobilealert")
  const [inout,setinout] = useState("Login")
  const Alert = () => {
      alert("Please login to access !")
  }

  useEffect(() => {
    if(access==0){
      setuser("Login")
      setpathway("/mobilealert")
      setinout("Login")
    }
    else if(access==1){
      setuser("Admin")
      setpathway("/mobile")
      setinout("Logout")
    }
    else if(access==2){
      setuser("Editor")
      setpathway("/mobile")
      setinout("Logout")
    }
    else if(access==3){
      setuser("Trainer")
      setpathway("/mobile")
      setinout("Logout")
    }

  })

  const Login = () => {
    const [username,setusername] = useState("")
    const [password,setpassword]= useState("")
    
    const handleChange = (event) => {
        let inputValue = event.target.value;
        setusername(inputValue)
    }

    const handleChange2 = (event) => {
        let inputValue = event.target.value;
        setpassword(inputValue)
    }

    const validate = () => {
        if(username=="admin" && password =="password"){
          setaccess(1)
        }
        else if(username == "editor" && password =="secret"){
          setaccess(2)
        }
        else if(username == "trainer" && password =="rahasia"){
            setaccess(3)
        }
        else{
          alert("Invalid username and password !")
        }
    }

    return(
        <>
        <h1>Please enter username and password</h1>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleChange}></input>
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handleChange2}></input>
        <br/>
        <button onClick={validate}>Submit</button>
        </>
    )
}

  return (
    <Router>
      <div>
        <header>
          <nav>
          <ul>
            <li><img src={logo} /></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>  
              <div className="dropdown">
                <button className="dropbtn">{user}</button>
                <div className="dropdown-content">
                  <Link to={pathway}>Mobile Apps List Editor</Link>
                  <Link to="/login">{inout}</Link>
                </div>
              </div> 
            </li>
          </ul>
          </nav>
        </header>
        <section>
          <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/mobilealert">
            <Alert />
          </Route>
          <Route path="/mobile">
            <Mobile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </section>
        <footer>
          <div className="center">
            <p>
              © Quiz 3 ReactJS Sanbercode
            </p>
          </div>
        </footer>
      </div>
    </Router>
      
    
  );
}

export default Routing