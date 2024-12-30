import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Container } from "@/components/molecules/Container";
import { HeaderAuthScreen } from "@/components/molecules/Header";

import { api } from "@/services/api";

import { colors } from "@/styles/colors";
import { viweStyle } from "@/styles/viwe";
import { useRoute } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { Alert, Image, Text,  View } from "react-native";


type RouteParams = {
  id: string;
};

export default function Product() {

  const  [data, setData] = useState<Produto>();
  const  [qtd, setQtd]= useState<string>('1');

  const router = useRoute()
  const routerParams = router.params as RouteParams;

  const getData = async () => {
    await api.get(`api/produto/${routerParams['id']}`)
    .then(({data})=>{
      setData(data); 
    })
    .catch(err=> {
      console.log(err);
    });
  }


  const addCart = async () => {
    await api.post('api/carrinho/',{
      "qtd": qtd,
      "produto": data?.id
    })
    .then(res=>{
      Alert.alert('CARRINHO', 'Produto adicionado ao carrinho.');
    })
    .catch((error)=>{
      Alert.alert('ERRO', `Erro ao efetuar o Login.\n${JSON.stringify(error.response['data'])}`);
    })
  }

  useEffect(()=> {
    getData();
  },[]);


  return (
    <>
      <HeaderAuthScreen/>
      <Container customStyle={{gap: 30}}>
        <View>
          <Image src={data?.image || ''} style={{width: '100%', height: 300}} />
        </View>
        <View>
          <Text style={{fontSize: 30}}>{data?.descricao}</Text>
          <Text style={{fontSize: 10, fontWeight: '200'}}>Código: {data?.cbr}</Text>
        </View>

        <View style={{borderTopWidth: 0.4, paddingVertical: 20}}>
          { (Number(data?.preco_antigo) > 0 && Number(data?.preco_antigo) !== Number(data?.preco)) 
            && (<Text style={{fontSize: 15, textDecorationLine: 'line-through'}}>De R$ {data?.preco_antigo}</Text>
          )}
          
          <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end', gap: 4}}>
            <Text style={{fontSize: 20, fontWeight: '200'}}>R$</Text>
            <Text style={{fontSize: 30}}>{data?.preco}</Text>
          </View>
        </View>
        
      </Container>
      <View style={[{flexDirection: 'row', gap: 20, padding: 10, backgroundColor:'#fff'}, viweStyle.backBlur]}>
        <Input 
          keyboardType="numeric"
          customStyle={{width: 150}}
          value={qtd}
          onChangeText={(e)=>setQtd(e)}
        />
        <Button 
          label={`Adicionar`}
          customStyle={{width: '60%', backgroundColor: colors.complementary[200]}}
          onPress={addCart}

        />
      </View>
    </>
  )
}