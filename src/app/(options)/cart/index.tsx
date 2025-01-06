import { Container } from "@/components/molecules/Container"
import { api } from "@/services/api"
import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useEffect, useState } from "react"
import { Alert, Image, Keyboard, Text, TouchableOpacity, View } from "react-native"
import style from "./style"
import { Input } from "@/components/atoms/Input"
import { Button } from "@/components/atoms/Button"
import { router } from "expo-router"
import { formatCurrency } from "@/services/utils"
import Toast from "react-native-toast-message"

export default function Cart() {
  const [dados, setDodas] = useState<any[]>([]);

  const removerItem = (item: any) => {
    Alert.alert(
      "Remover Produto?",
      "Confirma se realmente deseja remover o item do carrinho?",
      [
        {
          text: "VOLTAR",
          onPress: () => console.log("Cancelado"),
          style: "destructive",
        },
        {
          text: "REMOVER",
          onPress: async () => {
            try {
              await api.delete(`api/carrinho/${item?.id}/`);
              Alert.alert('CARRINHO', 'Item removido do carrinho.');
              getData();
            } catch (err) {
              Alert.alert('ERRO', JSON.stringify(err));
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  const getData = async () => {
    try {
      const { data } = await api.get('api/carrinho/');
      setDodas(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no Carrinho',
        text2: 'Erro ao buscar dados do carrinho.',
        position: 'bottom',
        autoHide: false,
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const atualizarQuantidade = (id: string, quantidade: string) => {
    setDodas((oldValue) =>
      oldValue.map((d) =>
        d?.id === id ? { ...d, qtd: quantidade } : d
      )
    );
  };

  const fetchAtualizarQuantidade = async (id: string, quantidade: string) => {
    if (Number(quantidade) <= 0) {
      Alert.alert('ERRO', 'A quantidade precisa ser um número maior que zero.');
      return;
    }

    try {
      await api.put(`api/carrinho/${id}/`, { qtd: parseInt(quantidade) });

      Toast.show({
        type: 'success',
        text1: 'Carrinho',
        text2: 'Quantidade atualizada',
        position: 'bottom'
      });

    } catch (error: any) {

      let erros = '';

      if (error.response['data']['non_field_errors'].length > 0) {
        for (const item of error.response['data']['non_field_errors']) {
          erros += `${item}\n`;
        }
      } else {
        erros = error.response['data'];
      }


      Toast.show({
        type: 'error',
        text1: 'Erro no Carrinho',
        text2: error.response ? JSON.stringify(erros) : 'Erro desconhecido',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });


    }
  }

  const valorTotal = dados?.reduce((acc, item) => acc + item.produto.preco * item.qtd, 0);

  return (
    <>
      <Container header={{ text: 'Carrinho' }}>
        {dados?.map((item) => (
          <View key={item?.id} style={style.card}>
            <View style={style.cardItem}>
              <Image source={{ uri: item?.produto?.image }} style={{ width: 70, height: 70 }} />
              <Text style={{ flexWrap: 'wrap', width: '80%' }}>{item?.produto?.title}</Text>
            </View>
            <View style={style.cardItem}>
              <View style={[style.cardItem, { gap: 15 }]}>
                <Input
                  keyboardType="numeric"
                  customStyle={{ width: 100 }}
                  value={String(item?.qtd)}
                  onChangeText={(e) => atualizarQuantidade(item?.id, e)}
                  onSubmitEditing={() => fetchAtualizarQuantidade(item?.id, item?.qtd)}
                />
                <TouchableOpacity onPress={() => fetchAtualizarQuantidade(item?.id, item?.qtd)}>
                  <Ionicons size={20} name="save-outline" color={'blue'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removerItem(item)}>
                  <Ionicons size={20} name="trash" color={'red'} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500' }}>{formatCurrency(item?.produto?.preco * item?.qtd)}</Text>
                  <Text>a prazo</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 10, fontWeight: '300' }}>Valor unitário:</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>{formatCurrency(item?.produto?.preco)}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Container>
      <View style={style.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: '300' }}>Valor Total</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{formatCurrency(valorTotal)}</Text>
        </View>
        <Button
          type="success"
          label="Continuar"
          onPress={() => router.push('/(options)/order')}
          disabled={!dados.length}
          textStyle={{ fontSize: 15 }}
        />
      </View>
    </>
  )
}
