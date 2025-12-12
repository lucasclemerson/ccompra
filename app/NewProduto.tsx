
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';

import NavBarDefault from "./components/NavBarDefault";
import theme from "./theme/theme";
import { useRouter } from "expo-router";

import { fetchCategorias, saveProduto } from './ApiRequest'; 

export default function App() {
  const router = useRouter();
  
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });

  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState(null); 
  const [quantidadeIdeal, setQuantidadeIdeal] = useState("");
  const [preco, setPreco] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false); // Gerencia se o dropdown está aberto/fechado
  
  // Mapeamos os itens para o formato que o DropDownPicker espera ({label: 'Nome', value: 1})
  const [items, setItems] = useState([]); 

  const loadCategorias = async () => {
    try {
      const data = await fetchCategorias(); 
      
      setCategorias(data);
    
      const mappedItems = data.map(cat => ({
          label: cat.nome,
          value: cat.id
      }));

      if (mappedItems.length > 0) {
        setCategoriaId(mappedItems[0].value); 
      }

      setItems(mappedItems);
    } catch (error) {
      // O tratamento de erro já foi feito em apiService, mas você pode adicionar mais aqui
      alert("Não foi possível carregar as categorias.");
    } finally {
      setIsLoading(false);
    }
  };

  const salvarProduto = async () => {
    // ... (validação inicial) ...
    if (!nome || !categoriaId || !quantidadeIdeal || !preco) {
      alert("Preencha todos os campos!");
      return;
    }
    // Prepara os dados no formato que a API espera
    const dadosProduto = {
      nome,
      quantidade_unidades: parseInt(quantidadeIdeal),
      preco: String(preco.replace(',', '.')), 
      idCategoria: categoriaId,
    };

    try {
      const novoProduto = await saveProduto(dadosProduto); // Chama a função da API
      alert("Produto cadastrado com sucesso!");
      router.push("/App"); 
    } catch (error) {
      alert("Erro ao salvar o produto.");
    }
  };

  // Carrega as categorias quando o componente é montado
  useEffect(() => {
    loadCategorias();
  }, []);

  
  if (!loaded) return null;

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBarDefault title="Adicionar Produto"/>

      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ padding: 20, backgroundColor: "#fff", flexGrow: 1 }}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Coca-Cola Lata"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Categoria</Text>
        {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.dark} style={{ marginTop: 10 }} />
        ) : (
            <DropDownPicker
                open={open}
                value={categoriaId}
                items={items}
                setOpen={setOpen}
                setValue={setCategoriaId}
                setItems={setItems}
                placeholder="Selecione uma categoria"
                style={styles.dropdownStyle}
                dropDownContainerStyle={styles.dropdownContainerStyle}
                zIndex={1000} // Garante que o dropdown apareça acima de outros elementos
            />
        )}

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
    marginVertical: 5,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: 'hidden', // Garante que o Picker respeite o borderRadius
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