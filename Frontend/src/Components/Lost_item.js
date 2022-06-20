import React, { useState } from "react";
import axios from "axios";
import lodash from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import { useToasts } from "react-toast-notifications";
import { Button, Modal, Form } from "react-bootstrap";
function Lost_item() {
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const token = window.localStorage.getItem("token");

  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState([]);
  const [type, settype] = useState("");
  const [place, setplace] = useState("");
  const [time, settime] = useState("");
  
  const [alertshow, setalertShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    // const form = new FormData();
    // form.append("name", itemname);
    // form.append("description", description);
    // form.append('itemPictures',itemname)
    // const payload = {
    //   name: itemname,
    //   description: description,
    //   type:type,
    //   itemPictures: itemimage,
    // };
    // console.log(payload)
    if (itemname && description && type) {
      console.log("Item image : ", itemimage);
      const info = new FormData();
      info.append("name", itemname);
      info.append("description", description);
      info.append("question", itemquestion);
      info.append("type", type);
      info.append("time", time);
      info.append("place", place);

      itemimage.map((itemImage) => {
        info.append("itemPictures", itemImage, itemImage.name);
      });

      axios({
        url: "http://localhost:5000/postitem",
        method: "POST",
        data: info,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
        credentials: "include",
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
        // url: "http://localhost:5000/login"
      })
        .then((response) => console.log(response))
        .then(() => {
          // eslint-disable-next-line no-lone-blocks
          addToast("Wohoo 🤩! Item listed successfully.",
          {
            appearance: "success",
          });
          
          setitemname("");
          setdescription("");
          settype("");
          setitemquestion("");
          settime("");
          setplace("");
          setitemimage([]);
          console.log("Executed");
          setShow(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          addToast("Oops 😞! Check internet connection or try again later.", {
            appearance: "error",
          });
        });
    }
    else{
      addToast("Did you missed any of the required fields 🙄?", {
        appearance: "error",
      });
    }
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Post Item
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             {/* <Form.Group>
              <Form.Label>Item name<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group> */} 
            <Form.Group>
              <Form.Label>Category<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose a catagory"
                onChange={(e) => setitemname(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Person"}>Person</option>
                <option value={"Pet"}>Pet</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"Vehicle"}>Vehicle</option>
                <option value={"Accesories"}>Accesories</option>
                <option value={"Documents"}>Documents</option>
                <option value={"others"}>others</option>
              </Form.Control>
            </Form.Group>


            <Form.Group>
              <Form.Label>Description<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter a question based on the item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex:- What is the color of the phone ?"
                value={itemquestion}
                onChange={(e) => setitemquestion(e.target.value)}
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Item type<span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                as="select"
                required={true}
                defaultValue="Choose..."
                onChange={(e) => settype(e.target.value)}
              >
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Place</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the approximate place where the item was lost or found"
                value={place}
                onChange={(e) => setplace(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>time</Form.Label>
              
              <input type="date" id="DOB" name="DOB" min="1979-01-01" max="2099-12-31" 
               value={time}
               onChange={(e) => settime(e.target.value)} />
              {/* <Form.Control
                as="textarea"
                placeholder="select the approximate date and time where the item was lost or found"
                value={time}
                onChange={(e) => settime(e.target.value)} 
              /> */}
            </Form.Group>
            {/* <Form.Group>
              <Form.File
                type="file"
                id="formimage"
                label="Image input"
                onChange={(e) => {
                  // console.log(e.target.files)
                  let { files } = e.target;
                  lodash.forEach(files, (file) => {
                    console.log(file);
                    setitemimage((item) => [...item, file]);
                  });
                }}
                multiple
              />
            </Form.Group> */}

            <Form.Group>
              
            <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg"
                
                onChange={(e) => {
                  // console.log(e.target.files)
                  let { files } = e.target;
                  lodash.forEach(files, (file) => {
                    console.log(file);
                    setitemimage((item) => [...item, file]);
                  });
                }}
                multiple
                />
            
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Lost_item;
