import { StyleSheet, Text, View } from "react-native";
import Event from "./Event";

import dayNames from "../../configs/day-names";

export default function DayBlock({ dateKey, dateData }) {
  const date = dateKey.split("-").reverse().join("/");

  const getEvent = ([time, data]) => <Event time={time} data={data} key={time} />;
  const events = Object.entries(dateData).map(getEvent);

  const expressions = (() => {
    const nowDate = new Date();
    nowDate.setHours(0, 0, 0, 0);
    const currentDate = new Date(dateKey);
    const diffTime = currentDate.getTime() - nowDate.getTime();
    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDay === 0) return "Hôm nay, ";
    if (diffDay === 1) return "Ngày mai, ";
    return "";
  })();
  const day = dayNames[new Date(dateKey).getDay() + 1];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {expressions}
        {day}, {date}
      </Text>
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
    borderWidth: 2,
    borderColor: "#dadee7",
    color: "#0f1729",
  },
  title: {
    fontFamily: "Roboto_600SemiBold",
    fontSize: 22,
    color: "#0f1729",
  },
});
