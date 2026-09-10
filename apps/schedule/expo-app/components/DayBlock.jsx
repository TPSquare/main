import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Event from "./Event";

export default function DayBlock({ dateKey, dateData }) {
  const date = dateKey.split("-").reverse().join("/");

  const events = useMemo(
    () =>
      Object.entries(dateData).map(([time, data]) => <Event time={time} data={data} key={time} />),
    [dateData],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{date}</Text>
      {events}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#dadee7",
    color: "#0f1729",
  },
  title: {
    fontFamily: "Roboto_600SemiBold",
    fontSize: 20,
    color: "#0f1729",
  },
});
