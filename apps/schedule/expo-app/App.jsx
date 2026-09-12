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
import { syncScheduleNotifications } from "./utils/schedule-notifications";

export default function App() {
  const [schedule, setSchedule] = useState({});

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_600SemiBold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  useEffect(() => {
    (async () => {
      const schedule = await getSchedule();
      setSchedule(schedule);
      syncScheduleNotifications(schedule);
    })();
  }, []);

  const scheduleBlocks = useMemo(
    () =>
      Object.entries(schedule).map(([key, data]) => {
        return <DayBlock dateKey={key} dateData={data} key={key} />;
      }),
    [schedule],
  );

  if (!fontsLoaded) return null;
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Text style={styles.title}>LỊCH TRÌNH</Text>
      {scheduleBlocks}
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FC",
    paddingBlock: 50,
  },
  title: { fontSize: 40, fontFamily: "Roboto_700Bold" },
});
