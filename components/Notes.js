import { View, Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet, Animated } from "react-native";
import {
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useRef, useState } from "react";

export default function Notes() {
  const [dropdownSelectVisible, setDropdownSelectVisible] = useState(true);
  const [noteEntryVisible, setNoteEntryVisible] = useState(false);

  const dropdownOpacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const hideMenu = () => {
    Animated.parallel([
      Animated.timing(dropdownOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDropdownSelectVisible(false);
    });
  };

  return (
    <GestureHandlerRootView>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Note
            title="Notatka 1"
            text="fwefwefwefwefwef"
            date={new Date().toDateString()}
          />
          <Note
            title="Notatka 1"
            text="fwefwefwefwefwef"
            date={new Date().toDateString()}
          />
          <Note
            title="Notatka 1"
            text="fwefwefwefwefwef"
            date={new Date().toDateString()}
          />
          {noteEntryVisible && <NoteEntry />}
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            width: 50,
            height: 50,
            backgroundColor: "#ebebeb",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setNoteEntryVisible((prev) => !prev)}
          >
            <Icon name={noteEntryVisible ? "close" : "add"} size={35}></Icon>
          </TouchableOpacity>
        </View>
        {dropdownSelectVisible && (
          <SelectDropdown
            onDropdownHide={hideMenu}
            options={["Zadanie 1", "Zadanie 2"]}
            opacity={dropdownOpacity}
            translateY={translateY}
          />
        )}
      </KeyboardAwareScrollView>
    </GestureHandlerRootView>
  );
}
const noteStyle = StyleSheet.create({
  note: {
    width: 180,
    height: 180,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    flex: 2,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textLight: {
    color: "#ebebeb",
  },
  content: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f3f3f",
    padding: 5,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    backgroundColor: "#2f2f2f",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
function SelectDropdown({
  options,
  onDropdownHide,
  dropdownOpacity,
  translateY,
}) {
  const selectWindowStyles = StyleSheet.create({
    container: {
      width: "50%",
      height: "auto",
      backgroundColor: "#ebebeb",
      position: "absolute",
      top: "50%",
      left: "25%",
    },
    closeIconContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    selectElement: {
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#b3b3b3ff",
    },
  });
  return (
    <Animated.View
      style={{
        ...selectWindowStyles.container,
        dropdownOpacity,
        transform: [{ translateY }],
      }}
    >
      <View style={selectWindowStyles.closeIconContainer}>
        <TouchableOpacity onPress={() => onDropdownHide()}>
          <Icon name="close" size={40}></Icon>
        </TouchableOpacity>
      </View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={selectWindowStyles.selectElement}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}
function NoteEntry() {
  return (
    <View style={noteStyle.note}>
      <View style={{ ...noteStyle.title, padding: 0 }}>
        <TextInput
          style={{ backgroundColor: "#4f4f4f", width: "100%" }}
          placeholder="Tytuł"
        ></TextInput>
      </View>
      <View style={noteStyle.content}>
        <TextInput placeholder="Treść"></TextInput>
      </View>
      <View style={noteStyle.footer}>
        <TextInput placeholder="fws"></TextInput>
      </View>
    </View>
  );
}
function Note({ title, text, date }) {
  return (
    <View style={noteStyle.note}>
      <View style={noteStyle.title}>
        <Text style={noteStyle.textLight} adjustsFontSizeToFit={true}>
          {title}
        </Text>
      </View>
      <View style={noteStyle.content}>
        <Text>{text}</Text>
      </View>
      <View style={noteStyle.footer}>
        <Text style={noteStyle.textLight}>{date}</Text>
      </View>
    </View>
  );
}
