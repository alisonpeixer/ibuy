import React from "react";


import { StyleProp, View, ViewStyle } from "react-native";
import style from "./styles";

export interface Props {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  showNav?: boolean;
}




export function Container({ children,customStyle, ...props }: Props) {
  return (
    <View style={[style.container, customStyle]} {...props}>
      {children}
    </View>
  )
}


