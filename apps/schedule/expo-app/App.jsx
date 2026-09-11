import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView } from "react-native";
import {
  Roboto_700Bold,
  Roboto_600SemiBold,
  Roboto_500Medium,
  Roboto_400Regular,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useEffect, useMemo, useState } from "react";

import getSchedule from "./utils/get-schedule";
import DayBlock from "./components/DayBlock";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_600SemiBold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  const [schedule, setSchedule] = useState({});
  const scheduleBlocks = useMemo(
    () =>
      Object.entries(schedule).map(([key, data]) => {
        return <DayBlock dateKey={key} dateData={data} key={key} />;
      }),
    [schedule],
  );
  useEffect(() => {
    (async () => setSchedule(await getSchedule()))();
  }, []);

  if (!fontsLoaded) return null;
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Text style={styles.title}>THỜI GIAN BIỂU</Text>
      {scheduleBlocks}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FC",
    paddingBlock: 50,
  },
  title: { fontSize: 40, fontFamily: "Roboto_700Bold", color: "#0f1729" },
});
