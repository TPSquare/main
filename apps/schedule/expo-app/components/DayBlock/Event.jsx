import { StyleSheet, View, Text } from "react-native";
import { useCallback, useContext, useMemo } from "react";

import InfoLine from "./InfoLine";
import AppContext from "../AppContext";

export default function Event({ time, data }) {
  const { eventTagsConfig, eventInformationConfig } = useContext(AppContext);
  const tagColor = eventTagsConfig[data.tag].color;

  const validInfo = useMemo(
    () => Object.entries(eventInformationConfig).filter(([key]) => data[key] || key === "time"),
    [eventInformationConfig],
  );
  const getLine = useCallback(
    ([key, name]) => {
      const value = key === "time" ? time.replace("-", " - ") : data[key];
      return <InfoLine name={name} value={value} key={key} tagColor={tagColor} />;
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
  container: { marginBlock: 20, borderRadius: 6 },
  wrapper: {
    marginLeft: 3,
    paddingLeft: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
