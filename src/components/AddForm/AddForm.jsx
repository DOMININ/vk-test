import React, { useState, useRef, useEffect } from "react";
import "./addForm.scss";

import { addTask, addColumn } from "../../actions/actionCreator";
import { connect } from "react-redux";

function AddForm(props) {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (cardIsOpen) {
      inputRef.current.focus();
    }
  }, [cardIsOpen]);

  const handleInputChange = ({ target: { value } }) => {
    setInputText(value);
  };

  const onAddCard = e => {
    if ((e.type === "click" || e.key === "Enter") && inputText.length > 0) {
      props.dispatch(addTask(props.index, inputText));
      setInputText("");
      setCardIsOpen(false);
    }
  };

  const onAddColumn = e => {
    if ((e.type === "click" || e.key === "Enter") && inputText.length > 0) {
      props.dispatch(addColumn(inputText));
      setInputText("");
      setCardIsOpen(false);
    }
  };

  const onAddClick = event => {
    props.isNotEmpty ? onAddCard(event) : onAddColumn(event);
  };

  const onCancelPress = e => {
    if (e.key === "Enter") {
      setInputText("");
      setCardIsOpen(false);
    }
  };

  return (
    <>
      {cardIsOpen ? (
        <div className="panel__card">
          <textarea
            ref={inputRef}
            placeholder={
              props.isNotEmpty
                ? "Введите название карточки"
                : "Введите название колонки"
            }
            cols="5"
            rows="2"
            className="panel__card-text"
            onChange={handleInputChange}
            value={inputText}
            onKeyPress={onAddClick}
          ></textarea>
          <button className="panel__card-button-add" onClick={onAddClick}>
            {props.isNotEmpty ? "Добавить карточку" : "Добавить колонку"}
          </button>
          <svg
            onClick={() => setCardIsOpen(false)}
            className="panel__card-button-cancel"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            tabIndex="0"
            onKeyPress={onCancelPress}
          >
            <path
              d="M7.5 6.71875L14.2188 0L15 0.78125L8.28125 7.5L15 14.2188L14.2188 15L7.5 8.28125L0.78125 15L0 14.2188L6.71875 7.5L0 0.78125L0.78125 0L7.5 6.71875Z"
              fill="#6B808C"
            />
          </svg>
        </div>
      ) : (
        <button onClick={() => setCardIsOpen(true)} className="panel__button">
          <svg
            className="panel__button-add"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1412 6.64122H8.35878V0.858779C8.35878 0.400763 7.95802 0 7.5 0C7.04198 0 6.64122 0.400763 6.64122 0.858779V6.64122H0.858779C0.400763 6.64122 0 7.04198 0 7.5C0 7.95801 0.400763 8.35878 0.858779 8.35878H6.64122V14.1412C6.64122 14.5992 7.04198 15 7.5 15C7.95802 15 8.35878 14.5992 8.35878 14.1412V8.35878H14.1412C14.5992 8.35878 15 7.95801 15 7.5C15 7.04198 14.5992 6.64122 14.1412 6.64122Z"
              fill="#6B808C"
            />
          </svg>
          <span>
            {props.isNotEmpty
              ? "Добавить еще одну карточку"
              : "Добавить еще одну колонку"}
          </span>
        </button>
      )}
    </>
  );
}

export default connect()(AddForm);
