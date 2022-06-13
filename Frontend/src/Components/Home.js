import React, { useState } from "react";
import Navbar  from "./Navbar"
import "../css/landing.css";
import Axios from "axios";
// import image from "../img/undraw_lost_bqr2.svg";
import image from "../img/lost-2.svg";
import about from "../img/about.jpg";
import login from "../img/login-1.svg";
import list_item from "../img/list-item.svg";
import notification from "../img/notification.svg";
import github from "../img/github.svg";
import linkedin from "../img/linkedin.svg";
import instagram from "../img/instagram.svg";
import mail from "../img/mail.svg";

// import image from "../img/earth.svg";
import { Container, Row, Button, Form } from "react-bootstrap";
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const postitem = () => {
    if (localStorage.getItem("user") !== null) {
      console.log("User already logged in !");
    } else {
      console.log("Not logged in");
    }
  };

  const sendMessage = () => {
    const data = {
      name,
      email,
      message,
    };
    Axios({
      method: "POST",
      url: "/sendmessage",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="intro">
          <div className="part-1">
            <div className="title">
              <h1>Lost and Found</h1>
              <p>Lost it. List it. Find it.</p>
            </div>
          </div>
          <div className="part-2">
            <div className="image">
              <img
                src={image}
                style={{ width: "500px", height: "500px" }}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="post-item">
          <button class="button" onClick={postitem}>Post Item</button>
        </div>        
      </div>
       
     
      <Container fluid className="total-inspiration">
        <div>
          <img
            src={about}
            style={{ width: "500px", height: "450px" }}
            alt=""
          />
        </div>
        <Row className="inspiration">
          <h6 className="section-heading">About lost and found</h6>
          <p>
           “Lost and Found” is an online platform that allow the users to post an item, whether it is a lost or found item. System moderators will ensure that the transactions will be smooth and trustworthy. The system caters any items both living and non-living things such as your cellphones, devices, dogs, cats, etc. Lost and Found is a unique platform through which peoples can find their loved ones who are missing in some tragedy or place. First of all, user come to the platform of lost and found then he/she will register to the site and report the missing/sighting of the particular person with filling the data that is required like age, name, complexion, height, weight, attire etc. After the successful reporting of missing/sighting person he/she can get the notification of matching profile/results of the registered report then he can go through the matching results and contact the person who has found that missing person.
          </p>
          <Button variant="custom" size="lg">
            Get Started
          </Button>
        </Row>
      </Container>
      <Container fluid>
        <div className="total-about">
          <div className="about-heading">
            <h6 className="section-heading">How it works ?</h6>
          </div>
          <div className="about-card">
            <div className="info">
              <img
                src={login}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
              <h4>Create an account</h4>
              <p>Initially, you have to create an account to get started.</p>
              <a href="/log-in"><Button variant="custom" size="lg">
                Sign Up
              </Button></a>
            </div>
            <div className="info">
              <img
                src={list_item}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
              <h4>List Lost/Found Item</h4>
              <p>
                List your item on the wall by filling certain details and image.
                That's it !
              </p>
            </div>
            <div className="info">
              <img
                src={notification}
                style={{ width: "200px", height: "200px" }}
                alt=""
              />
              <h4>Get Notified</h4>
              <p>
                Once anyone posts an item, we make our registred users aware
                about the same by sending notification .
              </p>
            </div>
          </div>
        </div>
      </Container>\
      <Container fluid>
        <div className="footer">
          <h6>contact us</h6>
          <div className="social-icon">
            <a href="https://github.com" target="_blank"><img src={github} className="icon github" alt="" /></a> 
            <a href="https://www.linkedin.com/" target="_blank"><img src={linkedin} className="icon" alt="" /></a> 
            <a href="https://www.instagram.com/" target="_blank"><img src={instagram} className="icon" alt="" /></a> 
            
          </div>

        </div>
      </Container>
     
    </>
  );
}
