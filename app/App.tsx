import "expo-router/entry";

import { useFonts } from "expo-font";
import { View, ScrollView, Text} from "react-native";
import NavBar from "./components/NavBar";
import InitComponents from "./components/InitComponents";
import theme from "./theme/theme";

export default function App() {
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });

  if (!loaded) return null;

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <InitComponents />
        <Text style={{ textAlign: "center", color: theme.colors.neutral, marginTop: 20 }}>
          CCompra LTDA ©2025y. Todos os direitos reservados.
        </Text>  
      </ScrollView>  
    </View>
  );
}
