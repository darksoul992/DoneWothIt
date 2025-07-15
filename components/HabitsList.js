import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from "react-native";
import WeekdayPicker from "./WeekdayPicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import Tile from "./Tile";
import { styles } from "./styles";
import TimePicker from "./TimePicker"

function HabitsList({ habits, onHabitRemove, onHabitAdd, onSnackBarVisible }) {
  const [habitsAddFormVisible, setHabitsAddFormVisible] = useState(false);
  const [habitFormInput, setHabitFormInput] = useState("");
  const [selectedWeekdaysIndexes, setSelectedWeekdaysIndexes] = useState([]);
  const [timerPickerVisible, setTimePickerVisible] = useState(true);
  const [time, setTime] = useState({hour: 0, minute: 0})

  const handleSelectTime = (hour, minute) => {
    setTimePickerVisible(false);
    console.log(hour, minute);
    setTime({hour: parseInt(hour), minute: parseInt(minute)});
  }


  const handleSelectWeekday = (index) => {
    if (selectedWeekdaysIndexes.includes(index)) {
      console.log("contains");
      setSelectedWeekdaysIndexes((prev) =>
        prev.filter((dayIndex) => dayIndex !== index)
      );
    } else {
      console.log("not contains");
      setSelectedWeekdaysIndexes((prev) => [...prev, index]);
    }
  };
  const weekdaysStringBuilder = (weekdaysIndexes) => {
    const weekDays = ["PON", "WT", "ŚR", "CZW", "PT", "SO", "ND"];
    let buildedString = "";
    weekdaysIndexes.forEach(
      (index) => (buildedString += weekDays[index] + " ")
    );
    return buildedString;
  };
  return (
    <Tile title="Twoje nawyki" contentStyles={{ margin: 0 }}>
      <>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.listElement}>
            <View style={{ flex: 9, padding: 10 }}>
              <Text style={{ fontSize: 24 }} adjustsFontSizeToFit={true}>
                {habit.content}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Icon size={24} name="date-range"></Icon>
                <Text>{weekdaysStringBuilder(habit.weekdays)}</Text>
              </View>
              <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}>
                  <Icon size={24} name="access-time"></Icon>
                <Text>{habit.time ? `${habit.time.hour < 10 ? "0"+String(habit.time.hour): String(habit.time.hour)}:${habit.time.minute < 10 ? "0"+String(habit.time.minute): String(habit.time.minute)}` : "00:00"}</Text>
              </View>
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
              onPress={() => onHabitRemove(habit.id)}
            >
              <Text>
                <Icon size={30} name="highlight-remove"></Icon>
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity
          color="#2f2f2f"
          onPress={() => setHabitsAddFormVisible((prev) => !prev)}
        >
          <Icon
            name={habitsAddFormVisible ? "keyboard-arrow-up" : "add"}
            size={46}
            color="#ebebeb"
          >
            {" "}
          </Icon>
        </TouchableOpacity>

        {habitsAddFormVisible && (
          <View style={styles.habitsContainer}>
            <TextInput
              style={{
                backgroundColor: "#e1e1e1",
                borderRadius: 10,
                paddingLeft: 20,
              }}
              value={habitFormInput}
              onChangeText={setHabitFormInput}
              placeholder="Nawyk"
            ></TextInput>
            <WeekdayPicker
              onWeekdaySelect={handleSelectWeekday}
              selectedWeekdays={selectedWeekdaysIndexes}
            />
            <TimeInput time={time} onTimeInputPress={() => setTimePickerVisible(true)}/>
            <TimePicker onTimeSelect={handleSelectTime} visible={timerPickerVisible}/>
            <Button
              onPress={() => {
                if (!habitFormInput || selectedWeekdaysIndexes.length === 0) {
                  Alert.alert(
                    "Nieprawidłowość",
                    "Wpisz nawyk w pole tekstowe oraz wybierz dni tygodnia",
                    [
                      {
                        text: "OK",
                        onPress: () => {},
                      },
                    ]
                  );
                  return;
                }
                onHabitAdd(habitFormInput, selectedWeekdaysIndexes, time);
                setHabitFormInput("");
                setSelectedWeekdaysIndexes([]);
                setHabitsAddFormVisible(false);
              }}
              color="#2f2f2f"
              title="Dodaj"
            ></Button>
          </View>
        )}
      </>
    </Tile>
  );
}
function TimeInput({time, onTimeInputPress}){
  console.log(time);
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginVertical: 10
    },
    input: {
      backgroundColor: "rgba(255,255,255,0.3)",
      color: "#4f4f4f",
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 20,
      marginHorizontal: 5
    },
    colon: {
      fontSize: 20,
      color: "rgba(255,255,255,0.3)"
    }
  })
  return(
    <TouchableOpacity onPress={onTimeInputPress}>
      <View style={styles.container}>
            <Icon name="access-time" size={48} style={{color: "rgba(255,255,255,0.3)"}}></Icon>
            <TextInput editable={false} value={String(time.hour)} style={styles.input}></TextInput>
            <Text style={styles.colon}>:</Text>
            <TextInput editable={false} value={String(time.minute)} style={styles.input}></TextInput>
          </View>
    </TouchableOpacity>
    
  )
}

export default HabitsList;
