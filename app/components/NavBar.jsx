import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Image, SafeAreaView  } from "react-native";
import theme from "../theme/theme";

export default function NavBar() {
  return (
    <SafeAreaView style={{ color:theme.colors.dark, backgroundColor: "#FFFFFF" }}>
      <StatusBar style="dark"/>
      <View style={{ zIndex: 10, elevation: 5, padding: 20, backgroundColor: theme.colors.light, flexDirection: "row", alignItems: "center", justifyContent: "space-between",}}>
        <TouchableOpacity onPress={() => console.log("Menu")}>
          <Image
            source={require("../../assets/images/project/buttom-list.png")} 
            style={{ width: 28, height: 28 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

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