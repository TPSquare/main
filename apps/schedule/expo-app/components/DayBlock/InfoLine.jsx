import { StyleSheet, Text, View } from "react-native";

export default function InfoLine({ name, value, tagColor }) {
  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.name, color: tagColor }}>{name}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const fontSize = 18;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  name: {
    fontFamily: "Roboto_500Medium",
    fontSize,
  },
  value: {
    flexShrink: 1,
    fontFamily: "Roboto_400Regular",
    fontSize,
  },
});
