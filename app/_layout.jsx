import { View } from "moti";
import { Button } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";
import theme from "./theme/theme";


export default function Layout() {
  const router = useRouter();
  
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}