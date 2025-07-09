import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Button,
  Alert,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ToDo from "./components/ToDo";
import HabitsList from "./components/HabitsList";
import { getRandomQuote } from "./assets/motivationalQuotes";
import Toast from "react-native-toast-message";

function MotivationalQuote({ quote }) {
  return (
    <View style={styles.quoteContainer}>
      <Text style={{ color: "#ebebeb", fontSize: 20, textAlign: "center" }}>
        {quote}
      </Text>
    </View>
  );
}
export default function App() {
  const [pressed, setPressed] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, content: "Czytać 10 stron dziennie", weekdays: [1, 3, 5] },
    { id: 2, content: "Chodzić spać o 22:00", weekdays: [0, 3] },
    {
      id: 3,
      content: "Uczyć się języka przez 30 minut dziennie",
      weekdays: [6],
    },
  ]);
  const [toDoToday, setToDoToday] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    text: "",
  });

  const handleSnackbarVisible = (text) => {
    setSnackbarVisible({ visible: true, text: text });
  };
  useEffect(() => {
    const today = new Date();
    let todaysWeekday = today.getDay();

    if (todaysWeekday === 0) todaysWeekday = 6;
    else todaysWeekday -= 1;

    const todaysTasks = habits.filter((habit) =>
      habit.weekdays.includes(todaysWeekday)
    );
    setToDoToday(todaysTasks);
  }, [habits]);

  const handleHabitRemove = (habit) => {
    Alert.alert(
      "Uwaga",
      "Czy na pewno chcesz usunąć? Nie będzie można tego cofnąć.",
      [
        {
          text: "Nie",
          onPress: () => {
            return;
          },
        },
        {
          text: "Tak",
          onPress: () => {
            setHabits((prev) => prev.filter((hab) => hab.id !== habit));
          },
        },
      ]
    );
  };
  const handleHabitAdd = (habit, weekdays) => {
    let maxIdNumber = 0;
    habits.forEach((habit) => {
      if (habit.id > maxIdNumber) maxIdNumber = habit.id;
    });
    setHabits((prev) => [
      ...prev,
      { id: maxIdNumber + 1, content: habit, weekdays: weekdays },
    ]);
    Toast.show({
      type: "success",
      text1: "Sukces",
      text1Style: { color: "#000000" },
      text2: "Powodzenia w trzymaniu nawyku",
      text2Style: { color: "#000000" },
      position: "bottom",
    });
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#4f4f4f" }}
      enableOnAndroid
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View style={styles.topbar}>
        <Text style={{ color: "#ebebeb", fontSize: 20 }}>MyHabits</Text>
        <TouchableOpacity>
          <Icon name="login" color="#ebebeb" size={36}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <MotivationalQuote quote={getRandomQuote()} />
        <ToDo toDoToday={toDoToday} />
        <HabitsList
          habits={habits}
          onHabitRemove={handleHabitRemove}
          onHabitAdd={handleHabitAdd}
          onSnackBarVisible={handleSnackbarVisible}
        />
      </View>

      <Toast />
    </KeyboardAwareScrollView>
  );
}
export function Tile({ children, title, contentStyles = {} }) {
  return (
    <View style={{ ...styles.habitsContainer, flexDirection: "column" }}>
      <View style={styles.tileTitle}>
        <Text style={styles.titleTileText}>{title}</Text>
      </View>
      <View style={{ ...contentStyles }}>{children}</View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#4f4f4f",
    paddingTop: StatusBar.currentHeight,
  },
  topbar: {
    backgroundColor: "#2f2f2f",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  mainContainer: {
    backgroundColor: "#4f4f4f",
    flex: 15,
  },
  tileTitle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleTileText: {
    fontSize: 20,
    color: "#ebebeb",
  },
  listElement: {
    backgroundColor: "#7f7f7f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
  },
  habitsContainer: {
    margin: 15,
    backgroundColor: "#3f3f3f",
    borderRadius: 20,
  },
  quoteContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
