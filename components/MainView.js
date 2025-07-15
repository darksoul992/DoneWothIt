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

import ToDo from "./ToDo";
import HabitsList from "./HabitsList";
import { getRandomQuote } from "../assets/motivationalQuotes";
import Toast from "react-native-toast-message";
import { styles } from "./styles";

function MotivationalQuote({ quote }) {
  return (
    <View style={styles.quoteContainer}>
      <Text style={{ color: "#ebebeb", fontSize: 20, textAlign: "center" }}>
        {quote}
      </Text>
    </View>
  );
}

function MainView({ habits, onHabitsSet, toDoToday, onTaskDone, tasksDone }) {
  const [pressed, setPressed] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState({
    visible: false,
    text: "",
  });

  const handleSnackbarVisible = (text) => {
    setSnackbarVisible({ visible: true, text: text });
  };

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
            onHabitsSet((prev) => prev.filter((hab) => hab.id !== habit));
          },
        },
      ]
    );
  };
  const handleHabitAdd = (habit, weekdays, time) => {
    let maxIdNumber = 0;
    habits.forEach((habit) => {
      if (habit.id > maxIdNumber) maxIdNumber = habit.id;
    });
    onHabitsSet((prev) => [
      ...prev,
      { id: maxIdNumber + 1, content: habit, weekdays: weekdays, time: time},
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
        <ToDo
          toDoToday={toDoToday}
          onTaskDone={onTaskDone}
          tasksDone={tasksDone}
        />
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
export default MainView;
