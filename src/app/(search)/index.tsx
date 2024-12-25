import { Href, Link } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/colors'
import { NavigationOptions } from 'expo-router/build/global-state/routing'

import { SvgXml } from 'react-native-svg';
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { viweStyle } from '@/styles/viwe'
import { StatusBar } from 'expo-status-bar'
import { Input } from '@/components/Input'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Index() {

  const goTo = (href: Href, options?: NavigationOptions) => {
    return router.navigate(href);
  }

  return (
    <Container customStyle={style.container}>
      <View style={[style.headerContainer, viweStyle.backBlur]}>
          <Text style={{fontSize: 17, fontWeight: '400'}}>Busca</Text>
      </View>
      <View style={{padding: 20}}>
        <View style={style.inputContainer}>
          <TextInput
            style={style.searchInput}
            placeholder="Tenis, Computador..."
            />
          <Ionicons name="search" size={22} style={style.icon} />
        </View>
      </View>

    </Container>
  )
}


const style = StyleSheet.create({
  container: {
    height: '100%',
    alignContent: 'center',
    gap: 20,
    padding: 0
  },
  title: {
    fontSize: 34,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Inter_200ExtraLight',
  },
  button: {
    width: 180
  },
  btnFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    padding: 10,
    justifyContent: 'center',

    borderRadius: 30,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10, // Espaçamento entre o campo de texto e o ícone
  },
  headerContainer: {height: 50, justifyContent: 'center', paddingLeft: 10, borderBottomWidth: 0.2, borderColor: colors.neutral[400], backgroundColor:'#fff'}

})