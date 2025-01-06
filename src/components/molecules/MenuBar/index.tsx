import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, useSegments } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import style from "./styles";
import { ButtonMenuProp } from "@/types/buttonMenu";
import { appHidenMenuScreen, appItensMenu } from "@/config/appMenu";

import * as SecureStore from 'expo-secure-store';

interface PageProps {
  children?: React.ReactNode;
}


export function MenuBar({children}:PageProps){

  const router = useRouter();
  const segments = useSegments();
  const [showMenu, setShowMenu] = useState(true);

  const BtnMenu = ({routerPath,icon,label, viweAuth}: ButtonMenuProp) => ( 
    (SecureStore.getItem('auth') === null && viweAuth) ? <></>:
    <View style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => router.navigate(routerPath)} style={style.headerBackBtn}>
    
        <Ionicons name={icon} size={22} style={(segments[0] === routerPath.toString().replace('/', '')) ? style.iconColorMenuActived : style.iconColorMenu} />
        <Text style={(segments[0] === routerPath.toString().replace('/', '')) ? style.textMenuAtived : style.textMenu}>{label}</Text>

      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    console.log(segments.join('/'))
    setShowMenu(!appHidenMenuScreen.map(item=> item.toString()).includes(`/${segments.join('/')}`));
  }, [segments]);
  
  
  

  if(!showMenu){
    return (<></>)
  }

  return (
    <>
      {children}

      <View style={[style.headerContent]}>
        {
          appItensMenu.map(({icon,label,routerPath,viweAuth},index)=> (
            <BtnMenu
              key={index}
              icon={icon}
              label={label}
              routerPath={routerPath}
              viweAuth={viweAuth}
            />
          ))
        }
      </View>
    </>
    
  )

}

