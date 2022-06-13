import React, { useEffect, useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

function Login() {
  
    let [info, setinfo] = useState("");
    const [firstname, setFirstname] = useState('');
        const [lastname, setLastname] = useState('');
        const [email, setEmail] = useState('');
        const [number, setNumber] = useState('');
        const [password, setPassword] = useState('');
        const [ccpass, setcPassword] = useState('');
    const [user_info, setuser_info] = useState("");
    const history = useHistory();

    const  submit=(event) =>{
      event.preventDefault();
      
        
      // console.log(setinfo)
      const payload1 = {
        firstname: firstname,
        lastname:lastname,
        email:email,
        number: number,
        password:password,
        
 
      
      };
      axios({
        url: "/signup",
        method: "POST",
        contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        data: payload1,
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        console.log("Response is :", response);
        setinfo(response.data);
      
        // console.log("Data has been sent")
        if (response.data === "Done") {
          history.push({ pathname: "/feed",  });
        }
        // console.log(document.getElementById('password').value)
        // console.log(document.getElementById('cpassword').value)
        // if(document.getElementById('password').value==document.getElementById('cpassword').value){
        //     console.log('Client : Password did matched')
        //     // this.props.history.push('/log-in')
        // }
        // else{
        //     document.getElementById('message').innerHTML='pass did not match'
        //     console.log('Client : Password did not matched')
        // }
        // return <Redirect to='/log-in'/>
      })
      .catch(() => {
        console.log("Error occured");
      });
      
      // .then((response)=>{
      //     console.log('Login Data sent')
      //     this.setState({
      //         info:response.data
      //     })
      //     // this.props.history.push('/feed')
      // })
      // .catch(()=>{
      //     console.log('Error occured')
      // })
    }
    useEffect(() => {
     


      $(document).ready(function(){
        $('.login-info-box').fadeOut();
        $('.login-show').addClass('show-log-panel');
    
    
    
    $('input[type="radio"]').on('change',function() {
       
    
        if($('#log-reg-show').is(':checked')) {
            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();
            
            $('.white-panel').removeClass('right-log');
            
            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
        }
        if($('#log-login-show').is(':checked')) {
            $('.register-info-box').fadeOut(); 
            $('.login-info-box').fadeIn();
            
            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel');
            
        }
    });
});


    });
    function login() {
      // console.log(setinfo)
      var payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      axios({
        url: "/login",
        method: "POST",
        data: payload,
        withCredentials: true,
        credentials: "include",
        // url: "http://localhost:5000/login"
      })
        .then((response) => {
          // console.log("Response is :",response)
          if (response.data.user) {
            //Authentication done.
            setuser_info(response.data.user);
            localStorage.setItem("token", response.data.jwt_token);
            // console.log(response.data.user)
            localStorage.setItem("user", JSON.stringify(response.data.user));
            history.push({ pathname: "/feed", user: response.data.user });
          } else {
            setinfo(response.data);
          }
          // console.log("Response :",response)
        })
        .catch((error) => {
          console.log(error);
          console.log("Error occured");
        });
      // .then((response)=>{
      //     console.log('Login Data sent')
      //     this.setState({
      //         info:response.data
      //     })
      //     // this.props.history.push('/feed')
      // })
      // .catch(()=>{
      //     console.log('Error occured')
      // })
    }
  
    // login = () => {
  
    //     axios({
    //       method: "POST",
    //       data: {
    //         username: document.getElementById('username').value,
    //         password: document.getElementById('password').value,
    //       },
    //       withCredentials: true,
    //       url: " http://localhost:5000/login",
    //     })
    //     .then((res) => console.log(res))
    //     .catch((err)=>console.log(err));
    //   };
  
    return (
      <>
        <Navbar />
  
        <div class="login-reg-panel">
            <div class="login-info-box">
                <h2>Have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-register" for="log-reg-show">Login</label>
         
                <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
            </div>
                        
            <div class="register-info-box">
                <h2>Don't have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-login" for="log-login-show">Register</label>
                <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
            </div>
                        
            <div class="white-panel">
                <div class="login-show">
                <h2>LOGIN</h2>
                <input type="text" placeholder="Email"   name="email"
            id="email"/>
 
            <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
                <input type="button" value="Login" onClick={login}/>
                
                </div>
                <div class="register-show">
                <h2>REGISTER</h2>
                <input type="text" placeholder="First Name" value={firstname} onChange={e => setFirstname(e.target.value)}        required />
                <input type="text"  value={lastname} onChange={e => setLastname(e.target.value)}
                placeholder="Last Name"
                 />
                <input type="text"
               value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email"
               />
                <input  type="text"
               value={number} onChange={e => setNumber(e.target.value)}
                placeholder="Phone Number"
                 />
                 <input type="password"  placeholder="Password"
             value={password} onChange={e => setPassword(e.target.value)}
                name="password"
                />
                <input type="password" placeholder="Confirm Password"
            value={ccpass} onChange={e => setcPassword(e.target.value)}
                name="cpassword"
                 />
                <input type="button" value="Register"  onClick={submit}/>
                </div>
            </div>
            </div>
      </>
    );
  }
  
  export default Login;
/*
class Home extends React.Component {
    
  componentDidMount(){
   //animation code
    $(document).ready(function(){
        $('.login-info-box').fadeOut();
        $('.login-show').addClass('show-log-panel');
    
    
    
    $('input[type="radio"]').on('change',function() {
       
    
        if($('#log-reg-show').is(':checked')) {
            $('.register-info-box').fadeIn();
            $('.login-info-box').fadeOut();
            
            $('.white-panel').removeClass('right-log');
            
            $('.login-show').addClass('show-log-panel');
            $('.register-show').removeClass('show-log-panel');
        }
        if($('#log-login-show').is(':checked')) {
            $('.register-info-box').fadeOut(); 
            $('.login-info-box').fadeIn();
            
            $('.white-panel').addClass('right-log');
            $('.register-show').addClass('show-log-panel');
            $('.login-show').removeClass('show-log-panel');
            
        }
    });
});
  }
  
 
  render() {
   
    return (
     
       
       <div class="login-reg-panel">
            <div class="login-info-box">
                <h2>Have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-register" for="log-reg-show">Login</label>
                <input type="radio" name="active-log-panel" id="log-reg-show" value="log-reg-show" />
            </div>
                        
            <div class="register-info-box">
                <h2>Don't have an account?</h2>
                <p>Lorem ipsum dolor sit amet</p>
                <label id="label-login" for="log-login-show">Register</label>
                <input type="radio" name="active-log-panel" value="log-login-show" id="log-login-show" />
            </div>
                        
            <div class="white-panel">
                <div class="login-show">
                <h2>LOGIN</h2>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="button" value="Login" />
                
                </div>
                <div class="register-show">
                <h2>REGISTER</h2>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <input type="button" value="Register" />
                </div>
            </div>
            </div>
         
       
     
      
)
};
}
export default Home; */