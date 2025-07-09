import { View, TouchableOpacity, Text } from "react-native";
export default function WeekdayPicker({ onWeekdaySelect, selectedWeekdays }) {
  const weekDays = ["PON", "WT", "ŚR", "CZW", "PT", "SO", "ND"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      {weekDays.map((weekday, index) => (
        <TouchableOpacity
          onPress={() => onWeekdaySelect(index)}
          key={index}
          style={{
            backgroundColor: selectedWeekdays.includes(index)
              ? "lightblue"
              : "#4f4f4f",
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: selectedWeekdays.includes(index) ? "#2f2f2f" : "#ebebeb",
            }}
          >
            {weekday}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
