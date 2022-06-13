import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setConstraint } from "../constraints";
import Navbar from "./Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import "./appbar.scss"
import Axios from "axios";
import { Card, Col, Container, Row,Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Feed1() {
  // console.log("Status :", LOGGED_IN)
  // const [user_info,setuser_info]=useState(localStorage.getItem("user"))
  // const [user_info,setuser_info]=useState(localStorage.getItem('user'))
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };
  // const [user_info,setuser_info]=useState('')
  // console.log(user_info)

  // const location = useLocation();
  // useEffect(()=>{
  //   if(location.user==null){
  //     console.log("if statement",user_info)
  //     // location.user=''
  //   }
  //   else{
  //     // console.log("Else",user_info)
  //     console.log(location.user)
  //     setuser_info(location.user)
  //     console.log(user_info)
  //     // console.log("Else statement",user_info)
  //   }
  // },[])
  // useEffect(()=>{
  //   console.log(location.user)
  //   localStorage.setItem('user',JSON.stringify(location.user))
  //   setuser_info((localStorage.getItem('user')))
  // },[])
  // console.log("User info is :", location.user);
  setConstraint(true);
  // var user_info
  // if(NEW_USER===false){
  //   user_info=location.user
  //   setUser(true)
  // }
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  useEffect(() => {
    // console.log("Test");
    Axios({
      url: "/getitem",
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.postitems;
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(created_date);
          // console.log(created_date.getDate()+"/"+created_date.getMonth()+"/"+created_date.getFullYear()+" "+created_date.getHours()+":"+created_date.getMinutes());
          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          // category.postitem.findOne({createdBy: item.createdBy}).populate('name')
          // .exec(function (err, story) {
          //   if (err) return err
          //   console.log('The author is %s', story);
          //   // prints "The author is Ian Fleming"
          // });
          // console.log(item.itemPictures[0].img)
          if (item.type === "Lost" && item.status===true) {
            let user = false;
            if (item.createdBy === user_info._id) {
              user = true;
            }
            // console.log("Lost item "+user+item.name)
            // console.log(`http://localhost:5000/${item.itemPictures[0].img}`)
            items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
              >
                <Col key={item.name} style={{ marginTop: "2%" }} md={4}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card">
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5000/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          } else {
            var user1 = false;
            if (item.createdBy === user_info._id) {
              user1 = true;
            }
            // console.log("Lost item "+user1+item.name)

            Found_items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
              >
                <Col style={{ marginTop: "2%" }} md={3}>
                  {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                  <Card bsPrefix="item-card" key={item.name}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5000/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Item :{item.name}
                      </Card.Title>
                      {/* <Card.Text>Type :{item.type}</Card.Text> */}
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Created at : {createdAt}
                      </Card.Text>
                      {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                  </Card>
                </Col>
              </a>
            );
          }
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="h2">
         
          <h5 >
          Welcome {user_info.firstname} 👋!
        </h5>
        </div>
      </div>
      <AppBar position="static" className="appbar">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className="tabs">
          <Tab className="appbar-text" label="Lost Items" {...a11yProps(0)} />
          <Tab className="appbar-text"label="Found Items" {...a11yProps(1)} />
         
        </Tabs>
      </AppBar>
      <TabPanel  value={value} index={0}>
      <Container fluid>
          
          <Row >{item}</Row>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Container fluid>
          {Found_item ? (
            <div >
              
             
              <Row className="a">{Found_item}</Row>
            </div>
          ) : (
            ""
          )}
        </Container>
      </TabPanel>
     
     
   
    </div>
  );
}
