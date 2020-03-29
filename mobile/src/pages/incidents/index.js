import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import longoImg from "../../assets/logo.png";
import styles from "./styles";
export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function natividateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get("/incidentes", {
      params: { page }
    });
    setTotal(response.headers["x-total-count"]);
    setIncidents([...incidents, ...response.data]);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={longoImg} />
        <Text style={styles.headerText}>
          Total de{" "}
          <Text Text style={styles.headerTextBold}>
            {total} casos.
          </Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos de salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={true}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG</Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>CASO</Text>
            <Text style={styles.incidentValue}>{item.title}</Text>

            <Text style={styles.incidentProperty}>DESCRIÇÃO</Text>
            <Text style={styles.incidentValue}>{item.description}</Text>

            <Text style={styles.incidentProperty}>VALOR</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => natividateToDetail(item)}
            >
              <Text style={styles.detailButtonText}> Ver mais detalhes </Text>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
