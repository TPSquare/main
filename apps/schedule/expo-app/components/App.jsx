import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, RefreshControl } from "react-native";
import {
  Roboto_700Bold,
  Roboto_600SemiBold,
  Roboto_500Medium,
  Roboto_400Regular,
  useFonts,
} from "@expo-google-fonts/roboto";
import { useCallback, useMemo, useState } from "react";

import AppContext from "./AppContext";
import getSchedule from "../hooks/get-schedule";
import syncScheduleNotifications from "../utils/schedule-notifications";
import generateScheduleBlocks from "../hooks/generate-schedule-blocks";
import getEventInformationConfig from "../hooks/get-event-information-config";
import getEventTagsConfig from "../hooks/get-event-tags-config";

export default function App() {
  const [appKey, setAppKey] = useState(0);
  const [schedule, setSchedule] = useState({});

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_600SemiBold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  getSchedule(appKey, setSchedule);
  const scheduleBlocks = generateScheduleBlocks(schedule);

  const [eventInformationConfig, setEventInformationConfig] = useState(null);
  getEventInformationConfig(setEventInformationConfig);
  const [eventTagsConfig, setEventTagsConfig] = useState(null);
  getEventTagsConfig(setEventTagsConfig);
  const contextValue = useMemo(
    () => ({ eventInformationConfig, eventTagsConfig }),
    [eventInformationConfig, eventTagsConfig],
  );

  syncScheduleNotifications(schedule, eventTagsConfig);

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
      <AppContext.Provider value={contextValue}>{scheduleBlocks}</AppContext.Provider>
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
