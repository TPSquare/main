import { StyleSheet, Text, View } from "react-native";
import Event from "./Event";

import dayNames from "../../configs/day-names";

export default function DayBlock({ dateKey, dateData }) {
  const date = dateKey.split("-").reverse().join("/");

  const getEvent = ([time, data]) => <Event time={time} data={data} key={time} />;
  const events = Object.entries(dateData).map(getEvent);

  const day = dayNames[(new Date(dateKey)).getDay() + 1];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{day}, {date}</Text>
      {events}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#dadee7",
    color: "#0f1729",
  },
  title: {
    fontFamily: "Roboto_600SemiBold",
    fontSize: 22,
    color: "#0f1729",
  },
});
