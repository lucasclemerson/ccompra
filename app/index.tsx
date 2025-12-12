import "expo-router/entry";
import { useFonts } from "expo-font";
import { View, ScrollView, Text, ActivityIndicator} from "react-native";
import NavBar from "./components/NavBar";
import InitComponents from "./components/InitComponents";
import theme from "./theme/theme";


import { checkApiConnection } from './ApiRequest'; 
import { useEffect, useState } from "react";


export default function Index() {
  const [loaded] = useFonts({
    NunitoRegular: require("../assets/fonts/Nunito/static/Nunito-Regular.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito/static/Nunito-SemiBold.ttf"),
  });


  {/* --- CONEXÃO COM A API--- */}
  const [connectionStatus, setConnectionStatus] = useState('loading'); 
  const [message, setMessage] = useState('Verificando conexão com a API...');


  const handleApiCheck = async () => {
    setMessage('Verificando conexão com a API...');
    const isConnected = await checkApiConnection();

    if (isConnected) {
      setConnectionStatus('success');
      setMessage('Conexão com a API OK!');
    } else {
      setConnectionStatus('error');
      setMessage('Erro de rede: Servidor inacessível ou URL incorreta.');
    }
  };

  useEffect(() => {
    handleApiCheck();
  }, []); // Executa apenas uma vez ao carregar o app

  // Define a cor do texto com base no status
  const statusColor = 
    connectionStatus === 'success' ? theme.colors.success : 
    connectionStatus === 'error' ? theme.colors.error : 
    theme.colors.warning;

  if (!loaded) return null;

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.light}}>
      <NavBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <InitComponents />

        <View style={{ marginTop: 20, alignItems: "center" }}>
          {connectionStatus === 'loading' && <ActivityIndicator size="small" color={theme.colors.warning} />}
          <Text style={{fontFamily: theme.fonts.bold, color: statusColor, marginTop: 5 }}>
            {message}
          </Text>
        </View>

        <Text style={{fontFamily: theme.fonts.bold, textAlign: "center", color: theme.colors.neutral, marginTop: 20 }}>
          CCompra LTDA ©2025y. Todos os direitos reservados.
        </Text>  
      </ScrollView>  
    </View>
  );
}