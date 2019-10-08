import React from "react";
import Panel from "./components/Panel/Panel";
import AddForm from "./components/AddForm/AddForm";
import { connect } from "react-redux";
import { reorderCards } from "./actions/actionCreator";
import { DragDropContext } from "react-beautiful-dnd";

function App(props) {
  const { tasks } = props;

  const onDragEnd = ({ source, destination }) => {
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    props.dispatch(reorderCards(source, destination));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {tasks.map((item, index) => (
          <Panel key={index} item={item} index={index} />
        ))}
      </DragDropContext>
      <div className="panel">
        <AddForm></AddForm>
      </div>
    </>
  );
}

const mapStateToProps = function(state) {
  return {
    tasks: state.tasks
  };
};

export default connect(mapStateToProps)(App);
