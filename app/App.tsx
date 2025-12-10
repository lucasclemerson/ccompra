import "expo-router/entry";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { View, Text } from "react-native";
import NavBar from "./components/NavBar";
import InitComponents from "./components/InitComponents";
import theme from "./theme/theme";

export default function App() {
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });

  if (!loaded) return null;

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "NunitoRegular" };

  return (
    <>
      <StatusBar style="light" /> 
      <View style={{flex: 1, backgroundColor: theme.colors.background }}>
        <NavBar />
        <InitComponents />
      </View>
    </>
  );
}
