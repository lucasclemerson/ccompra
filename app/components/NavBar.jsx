import { View, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";

export default function NavBar() {
  return (
    <View style={{ padding: 10, backgroundColor: theme.colors.dark }}>
      <Text style={{fontFamily: theme.fonts.regular, fontSize: 28, color:"#fff" }}>• CCompra</Text>
    </View>
  );

}