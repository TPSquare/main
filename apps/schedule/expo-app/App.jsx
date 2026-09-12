import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, RefreshControl } from "react-native";
import {
  Roboto_700Bold,
  Roboto_600SemiBold,
  Roboto_500Medium,
  Roboto_400Regular,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useCallback, useEffect, useMemo, useState } from "react";

import getSchedule from "./utils/get-schedule";
import DayBlock from "./components/DayBlock";
import { syncScheduleNotifications } from "./utils/schedule-notifications";

export default function App() {
  const [appKey, setAppKey] = useState(0);
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
  }, [appKey]);

  const scheduleBlocks = useMemo(
    () =>
      Object.entries(schedule).map(([key, data]) => {
        return <DayBlock dateKey={key} dateData={data} key={key} />;
      }),
    [schedule],
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setAppKey((prev) => prev + 1);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (!fontsLoaded) return null;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
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
