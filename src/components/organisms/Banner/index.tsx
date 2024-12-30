import React from "react"
import { Image, View } from "react-native"
import style from "./styles"

export function Banner() {
  return (
    <View>
      <Image source={require('@/images/banner-natal.jpg')} style={[style.image]} />
    </View>
  )
}