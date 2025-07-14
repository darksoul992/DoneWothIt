import { View, Text } from "react-native";

function Note({ title, text, date, noteStyle }) {
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
export default Note;
