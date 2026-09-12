import { StyleSheet, View, Text } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

import InfoLine from "./InfoLine";
import getEventInfo from "../../utils/get-event-info";
import getEventTagColors from "../../utils/get-event-tag-colors";

export default function Event({ time, data }) {
  const [eventInfo, setEventInfo] = useState({});
  useEffect(() => {
    (async () => setEventInfo(await getEventInfo()))();
  }, []);

  const [tagColor, setTagColor] = useState(null);
  useEffect(() => {
    (async () => setTagColor((await getEventTagColors())[data.tag] || "#434343"))();
  }, []);

  const validInfo = useMemo(
    () => Object.entries(eventInfo).filter(([key]) => data[key] || key === "time"),
    [eventInfo],
  );
  const getLine = useCallback(
    ([key, name]) => {
      const value = key === "time" ? time.replace("-", " - ") : data[key];
      return <InfoLine name={name} value={value} tagColor={data.tag} key={key} />;
    },
    [tagColor],
  );
  const infoLines = useMemo(() => validInfo.map(getLine), [getLine]);

  if (!tagColor) return <Text>Đang tải...</Text>;
  return (
    <View style={{ ...styles.container, backgroundColor: tagColor }}>
      <View style={styles.wrapper}>{infoLines}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBlock: 20, borderRadius: 4 },
  wrapper: {
    marginLeft: 3,
    paddingLeft: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
