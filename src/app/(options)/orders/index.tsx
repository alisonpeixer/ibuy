import { Container } from "@/components/molecules/Container";
import { api } from "@/services/api";
import { formatCurrency } from "@/services/utils";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";


interface Order  {
  id: number;
  status_pedido: string;
  desc_status_pedido: string;
  valor_total: number;
  created_at: string; 
};

export default function Orders() {
  const [dados, setDados] = useState<Order[] | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response = await api.get('api/pedido-venda/');
      setDados(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <Container header={{ text: 'Pedidos' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Container>
    );
  }

  return (
    <Container header={{ text: 'Pedidos' }} showNavHeader={true}>
      {dados?.length === 0 ? (
        <Text style={styles.noOrdersText}>Nenhum pedido encontrado.</Text>
      ) : (
        dados?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderItem}
            onPress={() => router.push(`/(options)/order/${item.id}`)}
          >
            <View style={{ width: '100%' }}>
              <Text style={styles.orderId}>Pedido #{item.id}</Text>

              <View style={styles.orderInfo}>
                <Text style={styles.orderValue}>
                  {formatCurrency(item.valor_total)} {/* Valor formatado */}
                </Text>
                <Text style={styles.orderStatus}>
                  Status: {item.status_pedido} - {item.desc_status_pedido}
                </Text>
                <Text style={styles.orderDate}>
                  Data: {new Date(item.created_at).toLocaleDateString()} {/* Data formatada */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  noOrdersText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.neutral[500],
    marginTop: 20,
  },
  orderItem: {
    backgroundColor: colors.neutral[100],
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.neutral[800],
  },
  orderInfo: {
    marginTop: 10,
  },
  orderValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  orderStatus: {
    fontSize: 14,
    color: colors.neutral[500],
    marginTop: 5,
  },
  orderDate: {
    fontSize: 12,
    color: colors.neutral[400],
    marginTop: 5,
  },
});
