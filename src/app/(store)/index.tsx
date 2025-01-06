import { View, Text, ScrollView, RefreshControl, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputSubmitEditingEventData, Alert } from 'react-native';
import { Input } from '@/components/atoms/Input';
import React, { useEffect, useState, useCallback } from 'react';
import { api } from '@/services/api';
import { Banner } from '@/components/organisms/Banner';
import { Card } from '@/components/atoms/Card';
import { router } from 'expo-router';

interface Produto {
  id: string;
  image: string;
  title: string;
  preco: number;
  preco_antigo: number;
}

export default function Index() {
  const [data, setData] = useState<Produto[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true); 
      const response = await api.get('api/produto/',{
        params: {
          search: searchText,
        },
      });


      if(!response.data.length) {
        Alert.alert('Busca de produto', 'Nem um produto encotrado para a busca atual.');
        setSearchText('');
      } else {
        setData(response.data);
      }

      setRefreshing(false); 

    } catch (error) {
      console.error('Erro ao buscar dados', error);
      setRefreshing(false);
    }
  };

  const goToProduto = (id: string) => {
    router.push(`/(store)/product/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);



  return (
    <View style={{ padding: 10, gap: 7 }}>
      <Input placeholder="O que está procurando?" icon="search" size={22} onSubmitEditing={fetchData} onChangeText={setSearchText} value={searchText}/>
      <ScrollView
        style={{ height: '100%' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Banner />
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>Ofertas do Dia 👀</Text>
          <ScrollView
            horizontal
            style={{ flex: 1, flexDirection: 'row', marginTop: 30, paddingBottom: 20 }}
            showsHorizontalScrollIndicator={false}
          >
            {data.length > 0 ? (
              data.map((item) => (
                <Card
                  key={item.id}
                  src={item.image}
                  description={item.title}
                  price={{
                    price: item.preco,
                    oldPrice: item.preco_antigo,
                  }}
                  onPress={() => goToProduto(item.id)}
                />
              ))
            ) : (
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <Text style={{ textAlign: 'center' }}>Ops... Houve algo ao carregar os dados...</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
