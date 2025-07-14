import { StyleSheet, View, Text, ScrollView } from "react-native";
function TimePicker() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#ebebeb",
      width: 350,
      height: 400,
      position: "absolute",
      top: "50%",
      left: "10%",
      flexDirection: "row",
    },
    numberPickerContainer: {
      flexDirection: "column",
      flex: 1,
      backgroundColor: "yellow",
    },
  });
  const hours = Array.from({ length: 23 }, (v, i) => i + 1);
  const repeatedHours = [...hours, ...hours, ...hours];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.numberPickerContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {repeatedHours.map((hour, i) => (
          <Text key={i}>{hour}</Text>
        ))}
      </ScrollView>
      <View
        style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 60 }}>:</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.numberPickerContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {repeatedHours.map((hour, i) => (
          <Text key={i}>{hour}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
export default TimePicker;
