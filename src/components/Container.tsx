import React from "react";


import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "@/styles/colors";
import { Href, router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { viweStyle } from "@/styles/viwe";

export interface Props {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  showNav?: boolean;
}

type IconName = keyof typeof Ionicons.glyphMap;


export function Container({ children,customStyle,showNav=true, ...props }: Props) {
  const useRouter = useRoute()
  const BtnMenu = ({routerPath,icon,label}:{routerPath:Href; icon:IconName; label: string;}) => (
    <View style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => router.navigate(routerPath)} style={style.headerBackBtn}>

        <Ionicons name={icon} size={22} style={[routerPath.toString()].includes(useRouter.name)  ? style.iconColorMenuActived : style.iconColorMenu} />
        <Text style={[`/${useRouter.name}`].includes(routerPath.toString() ) ?  style.textMenuAtived :style.textMenu}>{label}</Text>

      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={[style.container, customStyle]} {...props}>
        {children}
      </View>

      { showNav && (
        <View style={[style.headerContent]}>
          <BtnMenu
            icon="home-outline"
            label="Home"
            routerPath="/(app)"
          />
          <BtnMenu
            icon="search"
            label="Pesquisar"
            routerPath="/(search)"
          />
          <BtnMenu
            icon="ellipsis-horizontal-outline"
            label="Opções"
            routerPath="/(options)"
          />
        </View>
      )}
    </>
  )
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    fontFamily: 'Inter_400Regular',
    backgroundColor: colors.neutral[50]
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: colors.neutral[50]
  },
  headerContent: {
    width: '100%',
    position: 'relative',
    height: 50,
    backgroundColor: colors.neutral[50],
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
    paddingInline: 12,
  },
  headerBackBtn: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTextColorMenu: {
    color: colors.neutral[400]
  },
  textMenu: {
    fontSize: 10, 
    textAlign: 'center'
  },
  iconColorMenu: {
    color: colors.neutral[400]
  },
  iconColorMenuActived: {
    color: colors.neutral[700]
  },
  textMenuAtived: {
    fontSize: 10, 
    textAlign: 'center'
  }
})