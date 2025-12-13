
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import NavBarDefault from "./components/NavBarDefault";
import theme from "./theme/theme";
import { useRouter } from "expo-router";

import { saveCategoria } from './ApiRequest'; 

export default function App() {
  const router = useRouter();
  
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });

  const [nome, setNome] = useState("");
  const [slogan, setSlogan] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // Mapeamos os itens para o formato que o DropDownPicker espera ({label: 'Nome', value: 1})
  
  const salvarCategoria = async () => {
    if (!nome || !slogan) {
      alert("Preencha todos os campos!");
      return;
    }
    const dadosCategoria = {
      nome,
      slogan,
    }

    try {
      const novaCategoria = await saveCategoria(dadosCategoria); 
      alert("Categoria cadastrada com sucesso!");
      router.push("/");
    } catch (error) {
      alert("Erro ao salvar a categoria.");
      console.error("Erro ao salvar a categoria:", error);
    }
  };

  if (!loaded) return null;

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBarDefault title="Adicionar Categoria"/>

      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 20, backgroundColor: "#fff", flexGrow: 1 }}>
        <Text style={styles.label}>Nome da Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: produto de limpeza"
          value={nome}
          onChangeText={setNome}
        />
        
        <Text style={styles.label}>Slogan</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Deixe sua casa brilhando"
          value={slogan}
          onChangeText={setSlogan}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarCategoria}>
          <Text style={styles.textoBotao}>Salvar Categoria </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: 'hidden', 
  },
  botao: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  dropdownStyle: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    height: 50,
    marginVertical: 5,
  },
  dropdownContainerStyle: {
    borderColor: "#ddd",
    backgroundColor: "#fff"
  }
});