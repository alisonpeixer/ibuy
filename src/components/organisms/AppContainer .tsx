//#Libs
import React from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

//#Local
import { colors } from "@/styles/colors"
import { AuthProvider } from "./provider/AuthProvider"

export function AppContainer() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          animation: 'fade',
          statusBarTranslucent: false,
          statusBarHidden: false,
          statusBarStyle: 'dark',
          contentStyle: { backgroundColor: colors.neutral[50] }
        }}
      >
        <Stack.Screen name='(store)/index' options={{ headerShown: false, title: 'home' }} />
        <Stack.Screen name='(options)/index' options={{ headerShown: false, title: 'Mais Opções' }} />
        <Stack.Screen name='(search)/index' options={{ headerShown: false, title: 'Busca' }} />

        <Stack.Screen name='(options)/(auth)/sign-in/index' options={{ headerShown: false, title: 'Entrar' }} />
        <Stack.Screen name='(options)/(auth)/sign-up/index' options={{ headerShown: false, title: 'Registrar-se' }} />
        
        <Stack.Screen name='(options)/profile/index' options={{ headerShown: false, title: 'Perfil do Usuário' }} />

        <Stack.Screen name='(store)/product/[id]' options={{ headerShown: false, title: 'Produto' }} />

        <Stack.Screen name='(options)/cart/index' options={{ headerShown: false, title: 'Carrinho' }} />
      </Stack>
      <StatusBar style='dark' />
    </AuthProvider>
  )
}