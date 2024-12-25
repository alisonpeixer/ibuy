
import { api } from "@/services/api";
import { colors } from "@/styles/colors";
import { viweStyle } from "@/styles/viwe";
import { router } from "expo-router";

import React, { useEffect, useState } from "react";
import { SectionList, Text, View, StatusBar, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";




export function HomeProduct() {

  const [ data, setData ] = useState<Array<any>>([]);

  const fetchData = async () => {
    try {
      const { data } = await api.get('api/produto/');

      setData(data);
      console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchData();
  },[]);


  return (
    <ScrollView style={{height: '100%'}}>
      <View>
        <Image source={require('@/images/banner-natal.jpg')} style={[{ width: '100%', height: 204, borderRadius: 10 }, viweStyle.backBlur]} />
      </View>
      
      <View style={{ marginTop: 30}}>
        <Text style={{fontSize: 20, fontWeight: "500"}}>$Ofertas do Dia 👀</Text>
        <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row', marginTop: 30}} showsHorizontalScrollIndicator={false}>
          { data.length ? data.map((item:any)=> (
            <TouchableWithoutFeedback key={item.id} >
              <TouchableOpacity onPress={()=> router.navigate(`/(store)/product/${item.id}`)}  style={{ backgroundColor: colors.neutral[100], borderWidth: 0.4, width: 200, marginRight: 20, borderRadius: 20, padding: 10, height: 300}}>
                <Image src={item.image} style={{width: '100%', height: 200}} />
                <Text>{item.title}</Text>

                <Text>{item.title}</Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            ))
            :
            <View style={{justifyContent:'center', height: '100%'}}><Text style={{textAlign: 'center'}}>Ops... Houve algo ao carregar os dados...</Text></View>
          }

        </ScrollView>
      </View>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  
});