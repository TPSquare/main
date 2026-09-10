import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontFamily: "Roboto_700Bold" }}>THỜI GIAN BIỂU</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBlock: 50
  },
});
