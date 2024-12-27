import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { viweStyle } from "@/styles/viwe";
import { router } from "expo-router";
import style from "./styles";


export function HeaderAuthScreen() {
  return (
    <View style={{height: 50, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginBottom: 25,padding: 15}}>
        <TouchableOpacity style={[style.backButton,viweStyle.backBlur]} onPress={()=> router.back()}>
            <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>
        <TouchableOpacity style={[style.backButton,viweStyle.backBlur]} onPress={()=> router.navigate("/(options)")}>
            <Ionicons name="close" size={26} />
        </TouchableOpacity>
    </View>
  )
}