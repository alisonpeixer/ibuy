import React from "react"
import { Image, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View } from "react-native"
import styles from "./styles"
import { viweStyle } from "@/styles/viwe";


interface CardProps extends TouchableOpacityProps {
  src?: string;

  description?: string;

  footer?: string[] | number[]
}


export function Card({src, description, footer,...props}: CardProps) {
  return (
    <TouchableWithoutFeedback>
      <TouchableOpacity style={[styles.cardContainer,viweStyle.backBlur]} {...props}>
        <View style={styles.cardHeader}>
          {src && <Image src={src}  style={styles.cardImg}/>}
        </View>
        <Text>{description}</Text>
        <View>
          { footer?.map((item,index)=> (<Text key={index}>{item}</Text>))}
        </View>
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  )
}