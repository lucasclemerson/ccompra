import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import NavBarDefault from "../components/NavBarDefault";
import theme from "../theme/theme";

import { fetchCategory, fetchProdutosByCategoryId, deleteProdutoById } from "../ApiRequest";


export default function DetailsCategoria() {
  const { id } = useLocalSearchParams();
  const [categoria, setCategoria] = useState(null);
  const [produtos, setProdutos] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    getCategoria();
  }, [id]);

  
  async function getCategoria() {
    try {
      const data = await fetchCategory(id); 
      setCategoria(data);
      const produtosData = await fetchProdutosByCategoryId(id);
      setProdutos(produtosData); 
    } catch (error) {
      alert("Não foi possível carregar a categoria.");
    } finally {
      setIsLoading(false);
    }
  }

  
  const excluirItem = async (id) => {
    try {
      const result = await deleteProdutoById(id);
      if (result) {
        confirm("Produto excluído com sucesso!");
      }
    } catch (error) { 
      alert("Erro ao excluir o produto.");
    }
    finally {
      router.back();
      router.push(`/DetailsCategoria/${categoria.id}`);
    }
  };

  if (!categoria) {
    return (
      <View style={styles.center}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBarDefault title={categoria.nome}/>
      <Text style={[styles.item, {textAlign: "center", marginHorizontal: 0}]}>{categoria.slogan}</Text>
      <View style={[styles.container, {paddingTop: 10}]}>
        <FlatList
          data={produtos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={[styles.item, {fontWeight: 'bold', marginBottom: 5, fontSize: 24}]}>{item.nome}</Text>

                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.item}>Preço: R$ {item.preco}</Text>
                    <Text style={styles.item}>Quantidades: {item.quantidade_unidades}</Text>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: "#4CAF50" }]}
                      onPress={() => editarItem(item.id)}
                    >
                      <Text style={styles.btnText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: "#E53935" }]}
                      onPress={() => excluirItem(item.id)}
                    >
                      <Text style={styles.btnText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 12 },
  itemCard: {
    padding: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10,
  },
  item: { fontSize: 18 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    gap: 8,
  },

  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
