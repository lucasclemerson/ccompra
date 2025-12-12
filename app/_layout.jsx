import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";

export default function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); 
  }, []);

  if (loading) {
    return <Preloader />;
  }
  
  return <Stack screenOptions={{ headerShown: false }}/>;
}