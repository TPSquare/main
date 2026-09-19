import { Linking, StyleSheet, Text, View } from "react-native";

function InfoLine({ children, name, tagColor }) {
  return (
    <View style={styles.wrapper}>
      <Text style={{ ...styles.name, color: tagColor }}>{name}: </Text>
      {children}
    </View>
  );
}

export function InfoLineText({ name, text, tagColor }) {
  return (
    <InfoLine name={name} tagColor={tagColor}>
      <Text style={styles.text}>{text}</Text>
    </InfoLine>
  );
}

export function InfoLineLink({ name, link, anchor, tagColor }) {
  return (
    <InfoLine name={name} tagColor={tagColor}>
      <Text style={{ ...styles.text, ...styles.link }} onPress={() => Linking.openURL(link)}>
        {anchor}
      </Text>
    </InfoLine>
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
  text: {
    flexShrink: 1,
    fontFamily: "Roboto_400Regular",
    fontSize,
  },
  link: {
    color: "#0247fe",
    textDecorationLine: "underline",
  },
});
