import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import theme from "../theme/theme";

export default function NavBarDefault({ title }) {
  
  const router = useRouter();
  return (
    <SafeAreaView style={{ color:theme.colors.dark, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark"/>
      <View style={{ zIndex: 10, elevation: 5, padding: 20, backgroundColor: theme.colors.light, flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            paddingVertical: 12,
            alignItems: "center",
            backgroundColor: theme.colors.light,
            gap: 20,
          }}
        >
          <Image
            source={require("../../assets/images/project/voltar.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
       
        <Text style={{ fontSize: 24, fontFamily: theme.fonts.bold, color: "#000" }}>
          {title}
        </Text>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/project/woman.png")} 
            style={{ width: 40, height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>  
      </View>
    </SafeAreaView>
  );

}