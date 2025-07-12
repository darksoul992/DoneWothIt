import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./components/styles";
import { StyleSheet } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function Calendar({ toHighlight }) {
  return (
    // <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    //   <Text>Tu będzie kalendarz</Text>
    //   <CustomCalendar />
    // </KeyboardAwareScrollView>
    <GestureHandlerRootView>
      <View style={{ flex: 1, ...styles.container }}>
        <View style={styles.topbar}>
          <Text style={{ color: "#ebebeb", fontSize: 20 }}>MyHabits</Text>
          <TouchableOpacity>
            <Icon name="login" color="#ebebeb" size={36}></Icon>
          </TouchableOpacity>
        </View>
        <CustomCalendar toHighlight={toHighlight} />
      </View>
    </GestureHandlerRootView>
  );
}
function CustomCalendar({ toHighlight }) {
  print(toHighlight);
  const calendarStyles = StyleSheet.create({
    container: {
      backgroundColor: "#4f4f4f",
    },
    day: {
      flex: 1,
      borderRadius: 25,
      margin: 5,
      backgroundColor: "#353535ff",
      aspectRatio: 1,
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 1px 2px 0.05px #87878794",
    },
    dayText: { color: "#ebebeb", fontSize: 25, padding: 3 },
    monthName: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      fontSize: 30,
      textTransform: "uppercase",
      color: "#ebebeb",
      fontWeight: 600,
      textAlign: "center",
    },
  });
  const month = new Date().toLocaleString("default", { month: "long" });
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
      <View style={{ backgroundColor: "#4f4f4f", flex: 1 }}>
        <Text style={calendarStyles.monthName}>{month}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {dayNames.map((name, index) => (
            <View
              key={index}
              style={{ ...calendarStyles.day, backgroundColor: "#454545ff" }}
            >
              <Text>{name}</Text>
            </View>
          ))}
        </View>
        <FlatList
          data={days}
          renderItem={({ item }) => (
            <View
              style={{
                ...calendarStyles.day,
                backgroundColor: toHighlight.days.includes(item)
                  ? toHighlight.color
                  : "#353535ff",
              }}
            >
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
