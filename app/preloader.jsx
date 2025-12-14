import "expo-router/entry";
import { View, Text, Image } from "react-native";
import { MotiText } from "moti";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import theme from "./theme/theme";

import { loginUser } from './ApiRequest'; 

export default function prealoder() {
  const router = useRouter();
  const { nome, email, foto, password, token } = useLocalSearchParams();

  const profileImages = {
    "man.png": require("../assets/images/project/man.png"),
    "woman.png": require("../assets/images/project/woman.png"),
  }

  function handleSelectProfile(user) {
    router.push({
      pathname: "/Home",
      params: {       
        password: user.password,
        nome: user.nome,
        email: user.email,
        foto: user.foto,
        token: user.token
      },
    });
  }

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    logarUser();
  }, []);

  
  const logarUser = async () => {
    try {
      const data = await loginUser({
        "email": email,
        "password": "CCompra@2025",
      }); 
      
      const timer = setTimeout(() => {   
        let user = {       
          "password": password,
          "nome": nome,
          "email": email,
          "foto": foto,
          "token": data.token
        }
        handleSelectProfile (user)
      }, 2000);
    } catch (error) {
      console.error(error)
      alert("Não foi possível carregar os usuários.");
    } finally {
      setIsLoading(false);
    }
  }

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
        source={profileImages[foto] ?? profileImages["man.png"]}
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
        }}
      />

      <Text
        style={{
          marginTop: 20,
          color: theme.colors.dark,
          fontSize: 26,
          fontFamily: theme.fonts.bold,
        }}
      >
         {nome}
      </Text>

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
