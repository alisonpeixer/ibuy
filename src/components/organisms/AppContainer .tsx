//#Libs
import React from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

//#Local
import { colors } from "@/styles/colors"
import { AuthProvider } from "./provider/AuthProvider"
import { MenuBar } from "../molecules/MenuBar"

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
        <Stack.Screen name='(app)/index' options={{ headerShown: false, title: 'home' }} />
        <Stack.Screen name='(options)/index' options={{ headerShown: false, title: 'Mais Opções' }} />
        <Stack.Screen name='(search)/index' options={{ headerShown: false, title: 'Busca' }} />

        <Stack.Screen name='(options)/(auth)/sign-in/index' options={{ headerShown: false, title: 'Entrar' }} />
        <Stack.Screen name='(options)/(auth)/sign-up/index' options={{ headerShown: false, title: 'Registrar-se' }} />

        <Stack.Screen name='(store)/product/[id]' options={{ headerShown: false, title: 'Produto' }} />
      </Stack>
      <StatusBar style='dark' />
    </AuthProvider>
  )
}