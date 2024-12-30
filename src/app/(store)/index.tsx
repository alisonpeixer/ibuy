
import { View, Text, ScrollView, RefreshControl, TouchableWithoutFeedback } from 'react-native'

import { Input } from '@/components/atoms/Input'

import React, { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { Banner } from '@/components/organisms/Banner'
import { Card } from '@/components/atoms/Card'
import { Href, router } from 'expo-router'

export default function Index() {

  const [data, setData] = useState<Array<Produto>>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await api.get('api/produto/');

      setData(data);
      setRefreshing(false);

    } catch (error) {
      console.log(error)
    }
  }


  const goToProduto = (id: string) => {
    router.push(`/(store)/product/${id}`);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    fetchData();
  }, []);


  return (
    <View style={{padding:10, gap:7}}>
      <Input
        placeholder='Que está procurando?'
        icon='search'
        size={22}
      />
      <ScrollView style={{ height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Banner/>
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Ofertas do Dia 👀</Text>
          <ScrollView horizontal={true} style={{ flex: 1, flexDirection: 'row', marginTop: 30, paddingBottom: 20 }} showsHorizontalScrollIndicator={false}>
            {data.length ? data.map((item: any) => (
              <Card
                key={item.id}
                src={item.image}
                description={item.descricao}
                footer={[
                  item.preco,
                  item.preco_antigo,
                ]}
                onPress={()=> goToProduto(item.id)}
              />
            ))
              :
              <View style={{ justifyContent: 'center', height: '100%' }}><Text style={{ textAlign: 'center' }}>Ops... Houve algo ao carregar os dados...</Text></View>
            }

          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

