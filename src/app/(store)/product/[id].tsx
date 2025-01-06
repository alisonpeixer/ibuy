import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Container } from "@/components/molecules/Container";

import { api } from "@/services/api";

import { colors } from "@/styles/colors";
import { viweStyle } from "@/styles/viwe";
import { useRoute } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { Alert, Image, Text,  View } from "react-native";
import Toast from "react-native-toast-message";


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

    if(Number(qtd) <= 0) {
      Alert.alert('ATENÇÃO', 'A quantidade de itens não pode ser zero.');
      return;
    }

    await api.post('api/carrinho/',{
      "qtd": qtd,
      "produto": data?.id
    })
    .then(res=>{
      Toast.show({
        type: 'success',
        text1: 'Carrinho',
        text2: 'Produto adicionado ao carrinho.',
        position: 'top'
      });
    })
    .catch((error)=>{
      Toast.show({
        type: 'error',
        text1: 'Erro no Carrinho',
        text2: `${JSON.stringify(error.response['data'])}`,
        position: 'top',
        autoHide: false
      });
    })
  }

  useEffect(()=> {
    getData();
  },[]);


  return (
    <>
      <Container customStyle={{gap: 30}} showNavHeader={true}>
        <View>
          <Image src={data?.image || ''} style={{width: 360, height: 360}} />
        </View>
        <View>
          <Text style={{fontSize: 23}}>{data?.title}</Text>
          <Text style={{fontSize: 10, fontWeight: '200'}}>Código: {data?.cbr}</Text>
        </View>
        <View style={{borderTopWidth: 0.4, paddingVertical: 20, marginTop: 20}}>
          { (Number(data?.preco_antigo) > 0 && Number(data?.preco_antigo) !== Number(data?.preco)) 
            && (<Text style={{fontSize: 15, textDecorationLine: 'line-through'}}>De R$ {data?.preco_antigo}</Text>
          )}
          
          <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'flex-end', gap: 4}}>
            <Text style={{fontSize: 20, fontWeight: '200'}}>R$</Text>
            <Text style={{fontSize: 30}}>{data?.preco}</Text>
          </View>
        </View>
        <View style={{borderTopWidth: 0.4, paddingVertical: 20, gap: 4}}>
          <Text style={{fontSize: 15, fontWeight: '600'}}>Descricao</Text>
          <Text style={{fontSize: 14, fontWeight: '200'}}>{data?.descricao}</Text>
        </View>
        
      </Container>
      <View style={[{flexDirection: 'row', gap: 20, padding: 10, backgroundColor:'#fff'}, viweStyle.backBlur]}>
        <Input 
          keyboardType="numeric"
          customStyle={{width: 130}}
          value={qtd}
          onChangeText={(e)=>setQtd(e)}
        />
        <Button 
          label={`Adicionar`}
          customStyle={{width: '60%'}}
          onPress={addCart}
          type="outline"
        />
      </View>
    </>
  )
}