import { StyleSheet, View } from "react-native";
import { useEffect, useMemo, useState } from "react";

import InfoLine from "./InfoLine";
import getEventInfo from "../../utils/get-event-info";
import eventTagColors from "../../configs/event-tag-colors";

export default function Event({ time, data }) {
  const fullData = Object.assign({ time: time.replace("-", " - ") }, data);

  const [eventInfo, setEventInfo] = useState({});
  useEffect(() => {
    (async () => setEventInfo(await getEventInfo()))();
  }, []);

  const validInfo = useMemo(
    () => Object.entries(eventInfo).filter(([key]) => fullData[key]),
    [eventInfo],
  );
  const getLine = ([key, name]) => <InfoLine name={name} value={fullData[key]} key={key} />;
  const infoLines = validInfo.map(getLine);
  return (
    <View style={{ ...styles.container, backgroundColor: eventTagColors[data.tag] || "#434343" }}>
      <View style={styles.wrapper}>{infoLines}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBlock: 10, borderRadius: 5 },
  wrapper: {
    marginLeft: 3,
    paddingLeft: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
