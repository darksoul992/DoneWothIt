import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainView from "./components/MainView";
import Stats from "./components/Stats";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "@react-native-vector-icons/ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
const Tab = createBottomTabNavigator();
import Calendar from "./Calendar";
import Notes from "./components/Notes";
import { Title } from "react-native-paper";

const saveInStorage = async (key, toSave) => {
  try {
    const habitsJSON = JSON.stringify(toSave);
    await AsyncStorage.setItem(key, habitsJSON);
  } catch (e) {
    console.error("Błąd zapisu", e);
  }
};
const loadFromStorage = async (key) => {
  try {
    const habitsJSON = await AsyncStorage.getItem(key);
    return habitsJSON != null ? JSON.parse(habitsJSON) : [];
  } catch (e) {
    console.error("Błąd odczytu", e);
    return [];
  }
};

export default function App() {
  const [habits, setHabits] = useState([
    // { id: 1, content: "Czytać 10 stron dziennie", weekdays: [1, 3, 5] },
    // { id: 2, content: "Chodzić spać o 22:00", weekdays: [0, 3] },
    // {
    //   id: 3,
    //   content: "Uczyć się języka przez 30 minut dziennie",
    //   weekdays: [6],
    // },
  ]);
  const [toDoToday, setToDoToday] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasksDone, setTasksDone] = useState({ tasks: [], date: null });
  const [perfectDays, setPerfectDays] = useState({
    month: "202507",
    days: [1, 2, 3, 4, 5, 9, 10, 11],
  });
  const [notes, setNotes] = useState([
    {
      id: 1,
      habitID: 2,
      title: "Pompki",
      content: "Zrobić 10 pompek każdego dnia. Dzień 1 - nie udało się",
      date: new Date(),
    },
  ]);

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

  useEffect(() => {
    if (isLoaded) saveInStorage("@habits", habits);
  }, [habits]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habitsFromStorage = await loadFromStorage("@habits");
      if (habitsFromStorage) {
        setHabits(habitsFromStorage);
        setIsLoaded(true);
      }
    };

    const fetchTasksDone = async () => {
      const tasksDoneFromStorage = await loadFromStorage("@tasksDone");
      if (tasksDoneFromStorage) {
        if (!isSameDay(new Date(tasksDoneFromStorage.date), new Date())) {
          setTasksDone({ tasks: [], date: null });
          return;
        }
        setTasksDone(tasksDoneFromStorage);
      }
    };
    fetchHabits();
    fetchTasksDone();
  }, []);

  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const handleTaskDone = async (id) => {
    if (tasksDone.tasks.includes(id)) return;
    const newTasksDone = [...tasksDone.tasks, id];
    const newObj = { tasks: newTasksDone, date: new Date() };
    setTasksDone(newObj);
    await saveInStorage("@tasksDone", newObj);
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Start") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Statystyki") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "Kalendarz") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Notatki") {
              iconName = focused ? "pencil" : "pencil-outline";
            }
            return <Icon name={iconName} size={size} color={color}></Icon>;
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#ccc",
          tabBarStyle: {
            backgroundColor: "#2f2f2f",
            paddingBottom: 6,
            paddingTop: 6,
            height: 70,
          },
        })}
      >
        <Tab.Screen name="Start">
          {() => (
            <MainView
              habits={habits}
              onHabitsSet={setHabits}
              toDoToday={toDoToday}
              onTaskDone={handleTaskDone}
              tasksDone={tasksDone}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Statystyki" component={Stats} />
        <Tab.Screen name="Kalendarz">
          {() => (
            <Calendar
              toHighlight={{ days: perfectDays.days, color: "orange" }}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Notatki">
          {() => (
            <Notes
              tasks={habits.map((habit) => ({
                id: habit.id,
                content: habit.content,
              }))}
              notes={notes}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
