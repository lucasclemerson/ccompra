import { View, Text, Image } from "react-native";
import { MotiView, MotiText } from "moti";

import theme from "../theme/theme";

export default function Preloader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
            source={require("../../assets/images/project/woman.png")} 
            style={{ width: 80, height: 80,
                borderRadius: 20,
            }}
      />
      <Text style={{ marginTop: 20, color: theme.colors.dark, fontWeight: "bold", fontSize: 26, fontFamily: theme.fonts.bold }}>Maria Rita</Text>
        
      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, duration: 1000 }}
        style={{
          marginTop: 20,
          fontSize: 16,
          fontWeight: "600",
          color: "#000",
        }}
      >
        Estamos preparando tudo...
      </MotiText>
    </View>
  );
}