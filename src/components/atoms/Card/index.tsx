import React from "react"
import { Image, StyleProp, Text, TouchableOpacity, TouchableOpacityProps, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import styles from "./styles"
import { viweStyle } from "@/styles/viwe";
import { formatCurrency } from "@/services/utils";


type Price = {
  price: number;
  oldPrice: number;
}

interface CardProps extends TouchableOpacityProps {
  src?: string;
  description?: string;
  footer? : string[] | number[];
  price?  : Price;
  customStyle?: StyleProp<ViewStyle>;
}


export function Card({src, description,footer,price,customStyle,...props}: CardProps) {
  return (
    <TouchableWithoutFeedback>
      <TouchableOpacity style={[styles.cardContainer,viweStyle.backBlur,customStyle]} {...props}>
        <View style={styles.cardHeader}>
          {src && <Image src={src}  style={styles.cardImg}/>}
        </View>
        <Text>{description}</Text>
        <View>
          { footer?.map((item,index)=> (<Text key={index}>{item}</Text>))}
        </View>
        <View>
          <Text style={{textDecorationLine: 'line-through', fontSize: 10}}>De {formatCurrency(price?.oldPrice || 0)}</Text>
          <Text>{formatCurrency(price?.price || 0)}</Text>
        </View>
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  )
}