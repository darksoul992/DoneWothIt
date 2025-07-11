import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View } from "react-native";
import { styles } from "./components/styles";
import { StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";

function Calendar() {
  return (
    // <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    //   <Text>Tu będzie kalendarz</Text>
    //   <CustomCalendar />
    // </KeyboardAwareScrollView>
    <GestureHandlerRootView>
      <View style={{ flex: 1, ...styles.container }}>
        <CustomCalendar />
      </View>
    </GestureHandlerRootView>
  );
}
function CustomCalendar() {
  const calendarStyles = StyleSheet.create({
    container: {
      backgroundColor: "#4f4f4f",
    },
    day: {
      flex: 1,
      borderRadius: 25,
      margin: 5,
      backgroundColor: "#4f4f4f",
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    dayText: { color: "#ebebeb", fontSize: 25, padding: 3 },
  });
  const [monthName, setMonthName] = useState("");
  const [days, setDays] = useState([]);
  const dayNames = ["PON", "WTO", "ŚRO", "CZW", "PIĄ", "SOB", "NIE"];
  useEffect(() => {
    let dateNow = new Date();
    let month = dateNow.getMonth() + 1;
    let year = dateNow.getFullYear();

    let daysNumber = 0;
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) daysNumber = 31;
    else if ([4, 6, 9, 11].includes(month)) daysNumber = 30;
    else if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        daysNumber = 29;
      else daysNumber = 28;
    }
    let daysArrayToSet = Array.from({ length: daysNumber }, (v, i) => i + 1);

    let dateMonthBeginning = new Date(year, month - 1, 1);
    let dateMonthEnding = new Date(year, month - 1, daysNumber);
    let weekDayStart =
      dateMonthBeginning.getDay() === 0 ? 6 : dateMonthBeginning.getDay() - 1;
    let weekDayEnd =
      dateMonthEnding.getDay() === 0 ? 7 : dateMonthEnding.getDay();
    let finalArray = Array(weekDayStart)
      .fill(null)
      .concat(daysArrayToSet)
      .concat(Array(7 - weekDayEnd).fill(null));

    setDays(finalArray);
  }, []);
  return (
    days.length > 0 && (
      <View style={{ backgroundColor: "#2f2f2f", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {dayNames.map((name, index) => (
            <View style={{ ...calendarStyles.day, backgroundColor: "#3f3f3f" }}>
              <Text key={index}>{name}</Text>
            </View>
          ))}
        </View>
        <FlatList
          data={days}
          renderItem={({ item }) => (
            <View style={calendarStyles.day}>
              <Text style={calendarStyles.dayText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={7}
        />
      </View>
    )
  );
}
export default Calendar;
