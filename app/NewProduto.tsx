import { useState } from "react";

import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import NavBarDefault from "./components/NavBarDefault";
import theme from "./theme/theme";

export default function App() {

  
  const router = useRouter();

  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });

  if (!loaded) return null;


  
  const salvarProduto = () => {
    if (!nome || !categoria || !quantidadeIdeal || !preco) {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Produto cadastrado com sucesso!");
    router.back(); 
  };
  

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeIdeal, setQuantidadeIdeal] = useState("");
  const [preco, setPreco] = useState("");

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBarDefault title="Adicionar Produto"/>

      <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#fff", flexGrow: 1 }}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Coca-Cola Lata"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Bebidas"
          value={categoria}
          onChangeText={setCategoria}
        />

        <Text style={styles.label}>Quantidade Ideal</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 40"
          value={quantidadeIdeal}
          onChangeText={setQuantidadeIdeal}
        />

        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          placeholder="Ex: 6.99"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarProduto}>
          <Text style={styles.textoBotao}>Salvar Produto</Text>
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
});
