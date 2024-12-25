import React from 'react';

import { Redirect, router, Stack, Tabs, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Inter_900Black, Inter_400Regular, Inter_200ExtraLight, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { colors } from '@/styles/colors';

import * as SecureStore from 'expo-secure-store';



SplashScreen.preventAutoHideAsync();



export default function Layout() {


  const [loaded, error] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_200ExtraLight
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }

  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }



  return (
    <SafeAreaProvider >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.neutral[50] }}>
   
        <Stack
          screenOptions={{
            animation: 'fade',
            statusBarTranslucent: false,
            statusBarHidden: false,
            statusBarStyle: 'dark',
            contentStyle: { backgroundColor: colors.neutral[50] }
          }}
        >
          <Stack.Screen name='(app)/index' options={{ headerShown: false, title: 'home' }} />
          <Stack.Screen name='(options)/index' options={{  headerShown: false, title: 'Mais Opções' }} />
          <Stack.Screen name='(search)/index' options={{  headerShown: false, title: 'Busca' }} />

          <Stack.Screen name='(options)/(auth)/sign-in/index' options={{  headerShown: false, title: 'Entrar' }} />
          <Stack.Screen name='(options)/(auth)/sign-up/index' options={{  headerShown: false, title: 'Registrar-se' }} />
          
          <Stack.Screen name='(store)/product/[id]' options={{  headerShown: false, title: 'Produto' }} />

        </Stack>
 
        <StatusBar style='dark' />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
