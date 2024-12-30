import { Container } from "@/components/molecules/Container"
import { HeaderAuthScreen } from "@/components/molecules/Header"
import { api } from "@/services/api"
import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useEffect, useState } from "react"
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native"
import style from "./style"
import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import { viweStyle } from "@/styles/viwe"


export default function Cart() {

  const [dados, setDodas]= useState<any>();

  const removerItem = (item: any) => {
    

    Alert.alert(
      "Remover Produto?", 
      "Confirma se realmente dejsa remover o item do carrinho?", 
      [
        {
          text: "VOLTAR", 
          onPress: () => console.log("Cancelado"),
          style: "destructive",
        },
        {
          text: "REMOVER",
          onPress: async () => {
            await api.delete(`api/carrinho/${item?.id}/`)
            .then(()=>{
              Alert.alert('CARRINHO', 'Item removido do carrinho.');
              getData();
            })
            .catch(err=> {
              Alert.alert('ERRO', JSON.stringify(err));
            })
          },
        },
      ],
      { cancelable: true }
    );

  }

  const getData = async () => {
    await api.get('api/carrinho/')
    .then(({data}) => {
      setDodas(data)

    })
    .catch((error) => {

    })
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <View style={[style.headerContainer, viweStyle.backBlur]}>
          <Text style={{fontSize: 17, fontWeight: '400'}}>Carrinho</Text>
      </View>
      <Container>
        { dados?.map((item:any)=>(
          <View key={item?.id} style={style.card}>
            <View style={style.cardItem}>
              <Image src={item?.produto?.image} style={{width: 70, height: 70}}/>
              <Text >{item?.produto?.descricao}</Text>
            </View>
            <View style={style.cardItem}>
              <View style={[style.cardItem, {gap:15}]}>
                <Input 
                  keyboardType="numeric"
                  customStyle={{width: 100}}
                  value={item?.qtd}
                />
                <TouchableOpacity onPress={()=> removerItem(item)}>
                  <Ionicons size={20} name="trash"/>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>TOTAL - R$ {item?.produto?.preco * item?.qtd}</Text>
              </View>
            </View>
          </View>
        ))
        }
      </Container>
      <View style={style.footer}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>TOTAL - R$  {dados?.reduce((acc: number, item: any) => Number(acc) + Number(item.qtd), 0)} </Text>
        <Button type="success" label="Continuar" onPress={()=>alert('Compra realizada com sucesso!')} textStyle={{fontSize: 15}} customStyle={{width: '30%'}}/>
      </View>
    </>
  )
}