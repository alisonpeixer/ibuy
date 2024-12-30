import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { viweStyle } from "@/styles/viwe";
import { router } from "expo-router";
import style from "./styles";


export function HeaderAuthScreen({text}:{text?:string}) {
  return (
    <View style={{height: 50, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginBottom: 25,padding: 15}}>
        <TouchableOpacity style={[style.backButton,viweStyle.backBlur]} onPress={()=> router.back()}>
            <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>
        {text && <Text style={{ fontSize: 18 }}>{text}</Text>} 
        <TouchableOpacity style={[style.backButton,viweStyle.backBlur]} onPress={()=> router.navigate("/(options)")}>
            <Ionicons name="close" size={26} />
        </TouchableOpacity>
    </View>
  )
}