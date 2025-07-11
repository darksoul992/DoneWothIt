import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import { styles } from "./styles";

function Task({ item, onTaskDone, isDone }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(isDone);
  }, []);
  return (
    <View
      style={{
        ...styles.listElement,
        borderWidth: done ? 1 : 0,
        borderColor: "green",
      }}
    >
      <View
        style={{
          flex: 9,
          padding: 10,

          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Text style={{ fontSize: 24 }} adjustsFontSizeToFit={true}>
          {item.content}
        </Text>
        <Text style={{ color: done ? "green" : "red" }}>
          {done ? "Zrobione" : "Do zrobienia"}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.2)",
          height: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        onPress={() => {
          setDone(true);
          onTaskDone(item.id);
        }}
      >
        <Text>
          <Icon
            size={30}
            name={done ? "check-circle" : "check-circle-outline"}
          ></Icon>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Task;
