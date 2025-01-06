import React from "react";


import { ScrollView, Text, ScrollViewProps, StyleProp, View, ViewStyle, TextStyle } from "react-native";
import style from "./styles";
import { viweStyle } from "@/styles/viwe";
import { NavHeader } from "../NavHeader";

type tHeader = {
  text: string;
  customStyle?: StyleProp<ViewStyle>;
}

export interface Props  extends ScrollViewProps {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  header?: tHeader;
  showNav?: boolean;
  showNavHeader?: boolean;
}




export function Container({ children,customStyle,header,showNavHeader, ...props }: Props) {
  return (
    <>
      { (header?.text && !showNavHeader)  && 
        <View style={[style.headerContainer, viweStyle.backBlur, header?.customStyle]}>
          <Text style={{fontSize: 17, fontWeight: '400'}}>{header?.text}</Text>
        </View>
      }
      {showNavHeader && <NavHeader text={header?.text}/>}
      <ScrollView style={[style.container, customStyle]} {...props}>
        {children}
      </ScrollView>
    </>
  )
}


