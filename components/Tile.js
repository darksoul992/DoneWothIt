import { View, Text } from "react-native";
import { styles } from "./styles";

function Tile({ children, title, contentStyles = {} }) {
  return (
    <View style={{ ...styles.habitsContainer, flexDirection: "column" }}>
      <View style={styles.tileTitle}>
        <Text style={styles.titleTileText}>{title}</Text>
      </View>
      <View style={{ ...contentStyles }}>{children}</View>
    </View>
  );
}
export default Tile;
