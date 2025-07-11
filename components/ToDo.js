import { View, Text } from "react-native";
import Task from "./Task";

import Tile from "./Tile";

import { styles } from "./styles";

function ToDo({ toDoToday, onTaskDone, tasksDone }) {
  console.log(tasksDone.tasks);
  return (
    <Tile title="Dzisiejsze zadania" contentStyles={{ padding: 0 }}>
      {toDoToday.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            fontSize: 16,
            color: "#ebebeb",
          }}
        >
          Brak zadań na dziś.
        </Text>
      ) : (
        toDoToday.map((item) => (
          <Task
            item={item}
            key={item.id}
            isDone={tasksDone.tasks.includes(item.id)}
            onTaskDone={onTaskDone}
          />
        ))
      )}
    </Tile>
  );
}
export default ToDo;
