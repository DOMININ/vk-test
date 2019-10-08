import React from "react";
import "./panel.scss";
import Card from "../Card/Card";
import AddForm from "../AddForm/AddForm";
import { Droppable } from "react-beautiful-dnd";

function Panel(props) {
  return (
    <>
      <div className="panel">
        <div className="panel__inner">
          <h3 className="panel__title">{props.item.title}</h3>
          <Droppable droppableId={`${props.index}`}>
            {provided => (
              <ul
                className="panel__list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <Card columnIndex={props.index} text={props.item.cards}></Card>
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <AddForm isNotEmpty={props.item} index={props.index}></AddForm>
        </div>
      </div>
    </>
  );
}

export default Panel;
