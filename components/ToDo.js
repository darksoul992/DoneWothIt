import { View, Text } from "react-native";
import Task from "./Task";
import { styles } from "../App";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getRandomQuote } from "../assets/motivationalQuotes";
import { Tile } from "../App";

function ToDo({ toDoToday }) {
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
        toDoToday.map((item) => <Task item={item} key={item.id} />)
      )}
    </Tile>
  );
}
export default ToDo;
