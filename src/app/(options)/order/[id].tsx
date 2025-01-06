import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/molecules/Container";
import { api } from "@/services/api";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

type RouteParams = {
  id: string;
};

interface Pedido {
  cliente: string | null;
  created_at: string;
  desc_status_pedido: string;
  id: number;
  itens: Item[];
  pago: boolean;
  pvid: string;
  status_pedido: string;
  user: number;
  valor_total: string;
}

interface Item {
  id: number;
  item: string;
  preco: string;
  preco_total: string;
  produto: string | null;
  pvid: number;
  qtd: string;
  status_produto: number;
}

export default function Index() {
  const [dados, setDados] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const routerParams = route.params as RouteParams;

  const getData = async () => {
    try {
      const { data } = await api.get(`api/pedido-venda/${routerParams.id}/`);
      setDados(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  };

  const removerPedido = async () => {
    Alert.alert(
      "Remover Pedido?",
      "Confirma se deseja remover este pedido?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "default",
        },
        {
          text: "Remover",
          onPress: async () => {
            try {
              await api.delete(`api/pedido-venda/${routerParams.id}/`);
              Alert.alert("Pedido removido com sucesso!");
              router.push('/(options)/orders');
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível remover este pedido.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Erro ao carregar os dados do pedido.</Text>
      </View>
    );
  }

  return (
    <Container showNavHeader={true} header={{text: `Pedido #${dados.id}`}}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pedido #{dados.id}</Text>
          <Text style={styles.statusText}>Status: {dados.desc_status_pedido}</Text>
          <Text style={styles.dateText}>Data: {new Date(dados.created_at).toLocaleDateString()}</Text>
          <Text style={styles.totalText}>Total: {dados.valor_total}</Text>
          <Text style={dados.pago ? styles.paidStatus : styles.pendingStatus}>
            {dados.pago ? "Pago" : "Pendente"}
          </Text>
        </View>

        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>Itens do Pedido</Text>
          {dados.itens.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>Item: {item.item}</Text>
              <Text style={styles.itemText}>Quantidade: {item.qtd}</Text>
              <Text style={styles.itemText}>Preço: {item.preco}</Text>
              <Text style={styles.itemText}>Preço Total: {item.preco_total}</Text>
              <Text style={styles.itemText}>
                Status do Produto: {item.status_produto === 1 ? "Disponível" : "Indisponível"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Cliente: {dados.cliente || "Não informado"}</Text>
          <Text style={styles.footerText}>Usuário: {dados.user}</Text>
          <Text style={styles.footerText}>PVID: {dados.pvid}</Text>
        </View>
      </ScrollView>

      { (dados.status_pedido === "1") &&
        <View style={{height: 100, justifyContent: 'center'}}>
          <Button 
            label="Remover Pedido"
            type="danger"
            onPress={removerPedido}
          />
        </View>
      }
      
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6200EE",
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  paidStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
  },
  pendingStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 10,
  },
  itemsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
