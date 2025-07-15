import Icon from "@react-native-vector-icons/ionicons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Modal, Dimensions, Touchable, TouchableOpacity , OnLayout} from "react-native";
import { Button } from "react-native-paper";
function TimePicker({onTimeSelect, visible}) {

  const hoursScrollViewRef = useRef(null);
  const minutesScrollViewRef = useRef(null);

  const [hoursScrollViewHeight, setHoursScrollViewHeight] = useState(0);
  const [minutesScrollViewHeight, setMinutesScrollViewHeight] = useState(0);
  const [numberElementHeight, setNumberElementHeight] = useState(null)
  const [hoursIndex, setHoursIndex] = useState(0);
  const [minutesIndex, setMinutesIndex] = useState(0);

  

  const handleScroll = (e, mode) => {
    const offsetY = e.nativeEvent.contentOffset.y + 25;
    const nearestIndex = Math.round(offsetY / numberElementHeight);
    if(mode === "hours"){
      setHoursIndex(nearestIndex)
      
    }
    else if(mode === "minutes"){
      setMinutesIndex(nearestIndex)
    }
  }
  const onScrollEnd = (e, mode) => {
    if(mode === "hours"){
      hoursScrollViewRef.current.scrollTo({y: hoursIndex * numberElementHeight, animated: false})
    }
    else if(mode === "minutes"){
      minutesScrollViewRef.current.scrollTo({y: minutesIndex * numberElementHeight, animated: false})

    }
  }

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      backgroundColor: "#ebebeb",
      borderRadius: 20,
      padding: 20,
      width: Dimensions.get("window").width * 0.8,
      alignItems: 'center'
    },
    pickerWrapper: {
      flexDirection: 'row',
      height: 200,
      alignItems: "center",
      justifyContent: "center"
    },
    scrollContainer: {
      paddingVertical: 50,
      alignItems: 'center',
    } ,
    timeText: {
      fontSize: 60,
      paddingVertical: 10,
    },
    colon: {
      fontSize: 40,
      paddingHorizontal: 10
    },
    buttonConfirm: {
      backgroundColor: "#4f4f4f",
      borderRadius: 20,
      alignSelf: "stretch",
      marginVertical: 10,
      padding: 5,
    },
    buttonConfirmText: {
      textAlign: "center",
      fontSize: 20,
      color :"#ebebeb",
      
    }
  });
  const hours = Array.from({ length: 24 }, (v, i) => i < 10 ? "0"+i : i);
  const repeatedHours = [...hours, ...hours, ...hours];

  const minutes = Array.from({length: 60}, (v,i) => i < 10 ? "0"+i : i);

  const hour = hours[hoursIndex];
  const minute = minutes[minutesIndex];

  useEffect(()=> {
    console.log(hour);
    console.log(minute);
  }, [hour, minute])

  // useEffect(() => {
  //   if (hoursScrollViewHeight > 0 && minutesScrollViewHeight > 0) {
  //     hoursScrollViewRef.current?.scrollTo({ y: hoursScrollViewHeight / 3, animated: false });
  //     minutesScrollViewRef.current?.scrollTo({ y: minutesScrollViewHeight / 3, animated: false });
  //   }
  // }, [hoursScrollViewHeight, minutesScrollViewHeight]);

  return (
    visible &&
    <Modal transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.container}>
          <View style={styles.pickerWrapper}>
            <ScrollView
              ref={hoursScrollViewRef}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              onContentSizeChange={(_, h) => setHoursScrollViewHeight(h)}
              onScroll={(e) => handleScroll(e, "hours")}
              onMomentumScrollEnd={(e) => {
                onScrollEnd(e, "hours")
              }}
            >
              {hours.map((h, i) => (
                <Text key={i} style={styles.timeText}
                onLayout={i === 0 ? (e) => {
                  setNumberElementHeight(e.nativeEvent.layout.height)
                } : undefined}
                >{h}</Text>
              ))}
            </ScrollView>
            <Text style={styles.colon}>:</Text>

            <ScrollView
              ref={minutesScrollViewRef}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              onContentSizeChange={(_, h) => setMinutesScrollViewHeight(h)}
              onScroll={(e) => handleScroll(e, "minutes")}
              onMomentumScrollEnd={(e) => {
                onScrollEnd(e, "minutes")
              }}
              
            >
              {minutes.map((h, i) => (
                <Text key={i} style={styles.timeText}>{h}</Text>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.buttonConfirm} onPress={() => {onTimeSelect(hour, minute)}}>
            <Text style={styles.buttonConfirmText}>AKCEPTUJ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default TimePicker;
