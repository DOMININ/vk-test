const items = [
  {
    title: "План на месяц",
    cards: [
      "Пройти курс по React",
      "Отметить день рождения",
      "Записаться на курсы английского языка, чтобы уехать жить в Лондон",
      "Сделать бекенд своего сайта на node.js",
      "Собрать портфолио",
      "Написать первую статью в блог",
      "Записаться в мотошколу. Хотя немного страшновато, конечно. Друзья и родители против, но очень хочется. Но кого я обманываю, уже 2 года решаюсь на этот шаг 😢 Еще и друзья будут хрустиком называть. В общем, хотя бы подумать над этим."
    ]
  },
  {
    title: "План на неделю",
    cards: ["Записаться на курс по React", "Забронировать тир на субботу", "Накидать тем для статей в блог"]
  }
];

const tasks = (state = items, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return state.map((item, index) => {
        if (action.payload.index === index) {
          return {
            ...item,
            cards: [...item.cards, action.payload.text]
          };
        }
        return item;
      });
    case "ADD_COLUMN":
      return [
        ...state,
        {
          title: action.payload,
          cards: []
        }
      ];
    case "REORDER_CARDS":
      const { source, destination } = action.payload;
      const { index: sourceCardIndex, droppableId: sourceId } = source;
      const {
        index: destinationCardIndex,
        droppableId: destinationId
      } = destination;
      const sourceColumnIndex = +sourceId;
      const destinationColumnIndex = +destinationId;

      return state.map((item, currentColumnIndex) => {
        if (destinationColumnIndex === currentColumnIndex) {
          const [sourceCard] = state[sourceColumnIndex].cards.splice(
            sourceCardIndex,
            1
          );
          const destinationCards = Array.from(state[destinationColumnIndex].cards);
          destinationCards.splice(destinationCardIndex, 0, sourceCard);
          item.cards = destinationCards;
        }

        return item;
      });
    default:
      return state
  }
}

export default tasks;
