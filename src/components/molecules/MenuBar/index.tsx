import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, useRouter, useSegments } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import style from "./styles";
import { ButtonMenuProp } from "@/types/buttonMenu";
import { appHidenMenuScreen, appItensMenu } from "@/config/appMenu";


interface PageProps {
  children?: React.ReactNode;
}


export function MenuBar({children}:PageProps){

  const router = useRouter();
  const segments = useSegments();
  const [showMenu, setShowMenu] = useState(true);

  const BtnMenu = ({routerPath,icon,label}: ButtonMenuProp) => ( 
    <View style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => router.navigate(routerPath)} style={style.headerBackBtn}>
    
        <Ionicons name={icon} size={22} style={(segments[0] === routerPath.toString().replace('/', '')) ? style.iconColorMenuActived : style.iconColorMenu} />
        <Text style={(segments[0] === routerPath.toString().replace('/', '')) ? style.textMenuAtived : style.textMenu}>{label}</Text>

      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
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
          appItensMenu.map(({icon,label,routerPath},index)=> (
            <BtnMenu
              key={index}
              icon={icon}
              label={label}
              routerPath={routerPath}
            />
          ))
        }
      </View>
    </>
    
  )

}

