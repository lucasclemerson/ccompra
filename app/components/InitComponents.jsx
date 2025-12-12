import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import theme from "../theme/theme";


import { fetchCategorias } from '../ApiRequest'; 
import { Button } from "@react-navigation/elements";

export default function InitComponents() {
  const router = useRouter();
  const [showPrice, setShowPrice] = useState(true);  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const togglePrice = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setShowPrice(!showPrice);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  
  const loadCategorias = async () => {
    try {
      const data = await fetchCategorias(); 
      setCategorias(data);
    } catch (error) {
      // O tratamento de erro já foi feito em apiService, mas você pode adicionar mais aqui
      alert("Não foi possível carregar as categorias.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  return (
    <View style={{padding: 20 }}>
      <Text style={{ color: theme.colors.dark, fontSize: 35, fontFamily: theme.fonts.bold}}>
        Olá, Maria!
      </Text>
      <Text style={{ marginBottom:10, color: theme.colors.dark, fontSize: 20, fontFamily: theme.fonts.regular}}>
        Pronto para começar as compras?
      </Text>

      <View style={{ backgroundColor: "#FF824C", borderRadius: 12,  paddingHorizontal: 20, marginVertical: 20, paddingVertical: 30}}>
        <Text style={{ color:theme.colors.light, textAlign:"start", marginBottom: 10, fontSize: 18, fontFamily: theme.fonts.regular}}>
            O que você já colocou no carrinho:
        </Text>
        <Text style={{ color:theme.colors.light, textAlign:"start", fontSize: 26, fontFamily: theme.fonts.bold}}>
            <TouchableOpacity onPress={togglePrice} >
              <Animated.Image
                onPress={() => setShowPrice(!showPrice)}
                source={
                  showPrice
                  ? require("../../assets/images/project/olho-escondido.png")
                  : require("../../assets/images/project/olho-aberto.png")
                }
                style={{ marginEnd: 20, width: 25, height: 20,
              }}/>
            </TouchableOpacity>
            R$ {showPrice ? "*****" : "123,45"} para 8 items
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={{ width: "100%", textAlign:"start", paddingTop:0, paddingBottom:10, color: theme.colors.background, backgroundColor: theme.colors.text, fontSize: 26, fontFamily: theme.fonts.bold}}>
            Escolha uma opção rápida
        </Text>
        
        <TouchableOpacity style={[styles.card, {backgroundColor: "#ff8"}]} onPress={() => router.push("/CheckList")}>
          <Image
            source={require("../../assets/images/project/nova-compra.png")}
            style={{ marginBottom: 10, marginHorizontal: "auto", width: 40, height: 40, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center"}]}>Check de compras</Text>
          <Text style={[styles.subtitle, { textAlign: "center"}]}>Marque o que já comprou.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, {backgroundColor: "#88f"}]} onPress={() => router.push("/NewProduto")}>
          <Image
            source={require("../../assets/images/project/cesta-de-compras.png")} 
            style={{ marginBottom: 10, marginHorizontal: "auto", width: 40, height: 40, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center", color:theme.colors.light}]}>Novo produto</Text>
          <Text style={[styles.subtitle, { textAlign: "center", color:theme.colors.light}]}>Adicione apenas o que está em falta.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, {backgroundColor: "rgba(255, 136, 136, 1)"}]} onPress={() => router.push("/ListModel")}>
          <Image
            source={require("../../assets/images/project/modelo.png")} 
            style={{ marginBottom: 10, marginHorizontal: "auto", width: 40, height: 40, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center", color:theme.colors.dark}]}>Modelo de lista</Text>
          <Text style={[styles.subtitle, { textAlign: "center", color:theme.colors.dark}]}>Coloque o de sempre aqui.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, {backgroundColor: "rgba(136, 255, 146, 1)"}]} onPress={() => router.push("/NewCategoria")}>
          <Image
            source={require("../../assets/images/project/cardapio.png")} 
            style={{ marginBottom: 10, marginHorizontal: "auto", width: 40, height: 40, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center", color:theme.colors.dark}]}>Nova categoria</Text>
          <Text style={[styles.subtitle, { textAlign: "center", color:theme.colors.dark}]}>Adicione novas categorias aqui mesmo.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={{ width: "100%", textAlign:"start", paddingTop:0, paddingBottom:10, color: theme.colors.background, backgroundColor: theme.colors.text, fontSize: 26, fontFamily: theme.fonts.bold}}>
            Melhores categorias
        </Text>

        {isLoading ? (
          <Text style={styles.title}>Produtos carregando...</Text>
        ) : (
          categorias.map((categoria, index) => (
            <Button key={index} style={styles.card} onPress={() => router.push(`/DetailsCategoria/${categoria.id}`)}>
              <View style={{ alignItems: "center" }}>
                <Text style={[styles.title, { width: "100%", marginBottom: 4, flex: 0 }]}>{String(categoria.nome)}</Text>
                <Text style={styles.subtitle}>{String(categoria.slogan)}</Text>
              </View>
            </Button>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 5,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",          // duas colunas
    padding: 6,     // duas colunas
    paddingTop: 20,     // duas colunas
    paddingBottom: 20,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    elevation: 3,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
  },
});