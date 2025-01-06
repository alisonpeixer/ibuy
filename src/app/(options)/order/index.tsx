import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/molecules/Container";
import { api } from "@/services/api";
import { formatCurrency } from "@/services/utils";
import { colors } from "@/styles/colors";
import { viweStyle } from "@/styles/viwe";
import { router } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View, ActivityIndicator } from "react-native";
import styles from "./style";

interface Produto {
  descricao: string;
  title: string;
  cbr: string;
  preco: number;
  image: string;
}

interface ItemCarrinho {
  id: number;
  produto: Produto;
  qtd: number;
}

export default function Order() {
  const [dados, setDados] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const total = dados.reduce((acc, curr) => acc + curr.produto.preco * curr.qtd, 0);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('api/carrinho/');
      setDados(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os itens do carrinho.");
      console.error("Erro ao buscar carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

  const finalizerPedido = async () => {
    if (dados.length > 0) {
      setLoading(true);
      try {
        await api.post("api/pedido-venda/", { itens: dados });
        for (const item of dados) {
          await removerItemCarrinho(item);
        }
        Alert.alert("PEDIDO", "Pedido realizado com sucesso!");
        router.push("/(options)/orders");
      } catch (error) {
        Alert.alert("Erro", "Falha ao finalizar pedido.");
        console.error("Erro ao finalizar pedido:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const removerItemCarrinho = async (item: ItemCarrinho) => {
    try {
      await api.delete(`api/carrinho/${item.id}/`);
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ItemPedido = ({ item }: { item: ItemCarrinho }) => (
    <View style={[styles.card, viweStyle.backBlur]}>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.descricao}>{item.produto.title}</Text>
        <Text style={styles.codigo}>Código: {item.produto.cbr}</Text>
      </View>
      <View style={styles.row}>
        <Image source={{ uri: item.produto.image }} style={styles.image} />
        <View style={styles.info}>
          <Text>Quantidade: {item.qtd}</Text>
          <Text>Valor Unitário: {formatCurrency(item.produto.preco)}</Text>
          <Text>Valor Total: {formatCurrency(item.produto.preco * item.qtd)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Container header={{ text: "Pedido" }}>
      {loading && <ActivityIndicator size="large" color={colors.blue[200]} />}

      {!loading && dados.length > 0 && (
        <View style={{ flex: 1, gap: 15, padding: 10 }}>
          <Text style={{ fontWeight: "500" }}>Itens do Pedido</Text>
          {dados.map((item) => (
            <ItemPedido key={item.id} item={item} />
          ))}
        </View>
      )}

      <View style={[styles.summary, viweStyle.backBlur]}>
        <Text style={{ fontWeight: "500" }}>Pagamento</Text>
        <View>
          <SummaryRow label="Frete" value="R$ 0,00" />
          <SummaryRow label="Subtotal dos Itens" value={formatCurrency(total)} />
          <SummaryRow label="Descontos" value="R$ 0,00" />
          <SummaryRow label="Valor Total" value={formatCurrency(total)} bold />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          label={loading ? "Finalizando..." : "Finalizar Pedido"}
          onPress={finalizerPedido}
          disabled={loading}
          type="success"
        />
      </View>
    </Container>
  );
}

const SummaryRow = ({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) => (
  <View style={styles.rowBetween}>
    <Text>{label}</Text>
    <Text style={[styles.total, bold && styles.bold]}>{value}</Text>
  </View>
);

