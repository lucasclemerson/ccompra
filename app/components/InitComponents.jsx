import { View, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";

export default function InitComponents() {
  return (
    <View style={{padding: 20 }}>
      <Text style={{ color: theme.colors.text, fontSize: 28, fontFamily: theme.fonts.regular}}>
        Olá, Maria! como vai? Pronto para começar as compras?
      </Text>

      <View style={{ borderRadius: 12, padding: 10, marginTop: 20, marginBottom:theme.spacing.sm, backgroundColor: theme.colors.text}}>
        <Text style={{ textAlign:"center", paddingTop:10, paddingBottom:10, color: theme.colors.background, backgroundColor: theme.colors.text, fontSize: 24, fontFamily: theme.fonts.bold}}>
            Orçamento do mês 100,00R$
        </Text>
      </View>
    
      <View style={styles.container}>

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
    justifyContent: "space-center",
  },
  card: {
    width: "48%",          // duas colunas
    padding: 10,     // duas colunas
    paddingTop: 20,     // duas colunas
    paddingBottom: 20,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    elevation: 3,
    marginBottom: 15,
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