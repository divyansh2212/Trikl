import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import styles from "./DraggableInput.module.css";
import { Resizable } from "re-resizable";

function DraggableInput({ id, defaultText, onChange, onDelete, color }) {
  const [text, setText] = useState(defaultText || "");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const contentRef = useRef(null);

  useEffect(() => {
    if (defaultText) {
      setText(defaultText);
    }
  }, [defaultText]);

  useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      const newWidth = content.scrollWidth;
      const newHeight = content.scrollHeight;

      if (newWidth > width || newHeight > height) {
        setWidth(newWidth);
        setHeight(newHeight);
      }
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Resizable minWidth={100} minHeight={100}>
          <div
            className={styles.draggable_input}
            style={{ border: `2px solid ${color}`, color: `${color}` }}
          >
            <button className={styles.btn} onClick={handleDeleteClick}>
              &#x2715;
            </button>
            <div
              ref={contentRef}
              contentEditable
              onInput={handleTextChange}
              style={{ outline: "none", minHeight: "100%" }}
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}

export default DraggableInput;
