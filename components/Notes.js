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
import Note from "./Note";
import TimePicker from "./TimePicker";

export default function Notes({ tasks, notes }) {
  const [dropdownSelectVisible, setDropdownSelectVisible] = useState(true);
  const [noteEntryVisible, setNoteEntryVisible] = useState(false);
  const [currentHabitIDFilter, setCurrentHabitIDFilter] = useState(null);
  const [currentHabitNoteAdd, setCurrentHabitNoteAdd] = useState(null);
  const [habitSelectNoteAddVisible, setHabitSelectNoteAddVisible] =
    useState(false);

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

  const handleChangeHabitFilter = (id) => {
    setCurrentHabitIDFilter(id);
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
          {currentHabitIDFilter === null
            ? notes.map((note) => {
                return (
                  <Note
                    key={note.id}
                    title={note.title}
                    text={note.content}
                    date={note.date.toLocaleString()}
                    noteStyle={noteStyle}
                  />
                );
              })
            : notes
                .filter((note) => note.habitID === currentHabitIDFilter)
                .map((note) => (
                  <Note
                    key={note.id}
                    title={note.title}
                    text={note.content}
                    date={note.date.toLocaleString()}
                    noteStyle={noteStyle}
                  />
                ))}

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
            options={tasks}
            opacity={dropdownOpacity}
            translateY={translateY}
            onSelect={handleChangeHabitFilter}
          />
        )}
        {habitSelectNoteAddVisible && (
          <SelectDropdown>
            onDropdownHide={hideMenu}
            options={tasks}
            opacity={dropdownOpacity}
            translateY={translateY}
          </SelectDropdown>
        )}
        <TimePicker />
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
  onSelect,
}) {
  const selectWindowStyles = StyleSheet.create({
    container: {
      width: "50%",
      maxHeight: 250,
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
    <Animated.ScrollView
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
        <TouchableOpacity
          key={index}
          style={selectWindowStyles.selectElement}
          onPress={() => onSelect(option.id)}
        >
          <Text>{option.content}</Text>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  );
}
function NoteEntry() {
  return (
    <View style={noteStyle.note}>
      <View style={{ ...noteStyle.title, padding: 0 }}>
        <TextInput
          style={{
            backgroundColor: "#2f2f2f",
            paddingHorizontal: 5,
            color: "#ebebeb",
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          placeholder="Tytuł"
        ></TextInput>
      </View>
      <View style={{ ...noteStyle.content, padding: 0 }}>
        <TextInput
          placeholder="Treść"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#3f3f3f",
            color: "#ebebeb",
          }}
        ></TextInput>
      </View>
      <View style={{ ...noteStyle.footer, paddingHorizontal: 0 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2f2f2f",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={noteStyle.textLight}>Wybierz nawyk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
