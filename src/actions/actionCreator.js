export const addTask = (index, text) => ({
  type: 'ADD_TASK',
  payload: {
    index,
    text
  }
});

export const reorderCards = (source, destination) => ({
  type: 'REORDER_CARDS',
  payload: {
    source,
    destination
  }
});

export const addColumn = title => ({
  type: 'ADD_COLUMN',
  payload: title
});
