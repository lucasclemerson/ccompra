import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import theme from "./theme/theme";

import { fetchUsers } from "./ApiRequest";

export default function Index() {
  const router = useRouter();

  function handleSelectProfile(user) {
    router.push({
      pathname: "/preloader",
      params: {       
        password: user.password,
        nome: user.nome,
        email: user.email,
        foto: user.foto,
        token: "NOT FOUND"
      },
    });
  }

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers(); 
      setUsers(data);
    } catch (error) {
      console.error(error)
      alert("Não foi possível carregar os usuários.");
      
    } finally {
      setIsLoading(false);
    }
  };

  const profileImages = {
    "man.png": require("../assets/images/project/man.png"),
    "woman.png": require("../assets/images/project/woman.png"),
  }

  useEffect(() => {
    loadUsers();
  }, []);


  if (isLoading) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <Text
        style={{
          fontFamily: theme.fonts.bold,
          fontSize: 34,
          marginBottom: 20,
          color: theme.colors.dark,
          textAlign: "center",  
          marginVertical: 40,
        }}
      >
        Com quem estamos falando?
      </Text>

      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          onPress={() => handleSelectProfile(user)}
          style={{ padding: 15, backgroundColor: "#fff", borderRadius: 10, marginHorizontal: "auto", alignItems: "center", marginBottom: 20 }}
        >
          <Image
          source={profileImages[user.foto] ?? profileImages["man.png"]}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
          }}
        />

        <Text
          style={{
            marginTop: 10,
            color: theme.colors.dark,
            fontSize: 26,
            fontFamily: theme.fonts.bold,
          }}
        >
          {user.nome}
        </Text>
      </TouchableOpacity>
      ))}
    </View>
  );
}
