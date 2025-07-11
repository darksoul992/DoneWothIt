import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";

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
