import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DraggableInput from "./Components/DraggableInput.js";

import Colors from "./Components/Colors";

function App() {
  const [image, setImage] = useState();
  const [textFields, setTextFields] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [activeColor, setActiveColor] = useState("#FF0000");

  const fetchAPI = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_CLIENT_ID}`
      );
      setImage(response.data.urls.full);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const addTextField = () => {
    setTextFields([...textFields, { text: "", id: nextId }]);
    setNextId(nextId + 1);
  };

  const deleteField = (id) => {
    const updatedTextFields = textFields.filter((field) => field.id !== id);
    setTextFields(updatedTextFields);
  };

  const handleTextFieldChange = (text, index) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index].text = text;
    setTextFields(updatedTextFields);
  };

  return (
    <>
      <h1 className="heading">Assignment 1</h1>
      <p className="heading">
        You can navigate to the top left corner of the input field to adjust its
        size.
      </p>
      <div className="container">
        <div className="imageDiv">
          <img src={image} alt="Fetched Image" />
          {textFields.map((field, index) => (
            <DraggableInput
              color={activeColor}
              key={field.id}
              id={field.id}
              initialValue={field.text}
              onChange={(newText) => handleTextFieldChange(newText, index)}
              onDelete={deleteField}
            />
          ))}
        </div>
        <br />
        <div className="row">
          <div className="column">
            <button className="btn btn-primary btn-md" onClick={fetchAPI}>
              Fetch a new Image
            </button>
          </div>
          <Colors activeColor={activeColor} setActiveColor={setActiveColor} />
          <div className="column">
            <button className="btn btn-primary btn-md" onClick={addTextField}>
              Add new Input Field
            </button>
          </div>
        </div>
      </div>
      <p className="heading">
        You can Change color of input fields using color toolbar.
      </p>
    </>
  );
}

export default App;
