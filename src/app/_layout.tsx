//#Libs
import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

//#Local
import { colors } from '@/styles/colors';
import { FontLoader } from '@/components/organisms/FontLoader';
import { AppContainer } from '@/components/organisms/AppContainer ';
import { MenuBar } from '@/components/molecules/MenuBar';



export default function Layout() {
  return (
    <SafeAreaProvider >
      <SafeAreaView style={style.container}>
        <FontLoader>
          <AppContainer />
          <MenuBar />
          <Toast />
        </FontLoader>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1
  }
});