import { View, Text, ScrollView, RefreshControl, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputSubmitEditingEventData, Alert, StyleSheet } from 'react-native';
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
      const response = await api.get('api/produto/', {
        params: {
          search: searchText,
        },
      });


      if (!response.data.length) {
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


  const onRefresh = useCallback(() => {
    fetchData();
  }, []);



  return (
    <View style={{ padding: 10, gap: 7 }}>
      <View style={{padding: 20}}>
        <Input 
          placeholder="Carrinho, Parafuso..." 
          icon="search" size={22} 
          onSubmitEditing={fetchData} onChangeText={setSearchText} value={searchText} 
          customStyle={{borderRadius: 20}}
        />
      </View>
      <ScrollView
        style={{ height: '100%', alignContent: 'center'}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            {data.map((item) => (
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
            ))}
          </ScrollView>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',  
    alignItems: 'center',        
    gap: 10, 
  },
  item: {
    backgroundColor: '#ddd',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
});