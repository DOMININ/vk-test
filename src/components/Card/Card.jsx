import React from "react";
import "./card.scss";

import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  return (
    <>
      {props.text.map((item, index) => (
        <Draggable
          key={index}
          draggableId={`card-${props.columnIndex}-${index}`}
          index={index}
        >
          {provided => (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={index}
              className="panel__item"
            >
              {item}
            </li>
          )}
        </Draggable>
      ))}
    </>
  );
}

export default Card;
