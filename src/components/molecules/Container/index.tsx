import React from "react";


import { ScrollView, ScrollViewBase, ScrollViewProps, StyleProp, View, ViewStyle } from "react-native";
import style from "./styles";

export interface Props  extends ScrollViewProps {
  children: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  showNav?: boolean;
}




export function Container({ children,customStyle, ...props }: Props) {
  return (
    <ScrollView style={[style.container, customStyle]} {...props}>
      {children}
    </ScrollView>
  )
}


