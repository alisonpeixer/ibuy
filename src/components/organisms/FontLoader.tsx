import React from "react";

import * as SplashScreen from 'expo-splash-screen';
import { Inter_900Black, Inter_400Regular, Inter_200ExtraLight, useFonts } from '@expo-google-fonts/inter';
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export function FontLoader({ children }: { children: React.ReactNode }) {

  const [loaded, error] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_200ExtraLight
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

  }, [loaded, error]);

  if (!loaded && !error) {
    return <Text>Carregando a Fonte...</Text>;
  }

  return (
    <>
      {children}
    </>
  )
}