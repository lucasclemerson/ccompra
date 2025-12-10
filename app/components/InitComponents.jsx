import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../theme/theme";

export default function InitComponents() {
  return (
    <View style={{padding: 20 }}>
      <Text style={{ color: theme.colors.dark, fontSize: 35, fontFamily: theme.fonts.bold}}>
        Olá, Maria!
      </Text>
      <Text style={{ marginBottom:40, color: theme.colors.dark, fontSize: 20, fontFamily: theme.fonts.regular}}>
        Pronto para começar as compras?
      </Text>

      <View style={{ backgroundColor: "#FF824C", borderRadius: 12, marginVertical: 20}}>
        <Text style={{ color:theme.colors.light, textAlign:"center", paddingVertical: 20, fontSize: 26, fontFamily: theme.fonts.bold}}>
            Orçamento do mês ***** R$
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={{ width: "100%", textAlign:"start", paddingTop:0, paddingBottom:10, color: theme.colors.background, backgroundColor: theme.colors.text, fontSize: 26, fontFamily: theme.fonts.bold}}>
            Escolha uma opção rápida
        </Text>
        
        <View style={[styles.card, {backgroundColor: "#ff8"}]}>
          <Image
            source={require("../../assets/images/project/nova-compra.png")} 
            style={{ marginBottom: 20, marginHorizontal: "auto", width: 50, height: 50, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center"}]}>Lista de compras</Text>
          <Text style={[styles.subtitle, { textAlign: "center"}]}>Altere apenas o que está em falta.</Text>
        </View>

        <View style={[styles.card, {backgroundColor: "#88f"}]}>
          <Image
            source={require("../../assets/images/project/cesta-de-compras.png")} 
            style={{ marginBottom: 20, marginHorizontal: "auto", width: 50, height: 50, textAlign: "center"
          }}/>
          <Text style={[styles.title, { textAlign: "center", color:theme.colors.light}]}>Novo produto</Text>
          <Text style={[styles.subtitle, { textAlign: "center", color:theme.colors.light}]}>Altere apenas o que está em falta.</Text>
        </View>
      </View>
    


      <View style={styles.container}>
        <Text style={{ width: "100%", textAlign:"start", paddingTop:0, paddingBottom:10, color: theme.colors.background, backgroundColor: theme.colors.text, fontSize: 26, fontFamily: theme.fonts.bold}}>
            Melhores categorias
        </Text>

        {/* Produto de Limpeza */}
        <View style={styles.card}>
          <Text style={styles.title}>Produtos de Limpeza</Text>
          <Text style={styles.subtitle}>Sua casa sempre brilhando!</Text>
        </View>

        {/* Alimentos */}
        <View style={styles.card}>
          <Text style={styles.title}>Alimentos</Text>
          <Text style={styles.subtitle}>Sabor e qualidade que fazem a diferença.</Text>
        </View>

        {/* Cosméticos */}
        <View style={styles.card}>
          <Text style={styles.title}>Cosméticos</Text>
          <Text style={styles.subtitle}>Realce a sua beleza natural.</Text>
        </View>

        {/* Baganas */}
        <View style={styles.card}>
          <Text style={styles.title}>Baganas</Text>
          <Text style={styles.subtitle}>Refrigerantes, pipocas e chocolates! </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Natuarais</Text>
          <Text style={styles.subtitle}>Polpas, frutas e verduras.</Text>
        </View>

         <View style={styles.card}>
          <Text style={styles.title}>Proteinas</Text>
          <Text style={styles.subtitle}>Peito de frango e carnes.</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 5,
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",          // duas colunas
    padding: 10,     // duas colunas
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