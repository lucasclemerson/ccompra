import { View } from "react-native";
import { createContext } from "react";
import NavBar from "./components/NavBar";
import InitComponents from "./components/InitComponents";




import theme from "./theme";

export const ThemeContext = createContext(theme);

export default function App() {
  return (
    <View>
      <NavBar />
      <InitComponents />
    </View>
  );
}
