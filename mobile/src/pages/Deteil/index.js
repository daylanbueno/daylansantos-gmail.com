import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import longoImg from "../../assets/logo.png";
import styles from "./styles";
import { formatadorMoeda } from "../../util/FormatadorUtil";
import { Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso ${
    incident.title
  } com o valor de  ${formatadorMoeda(incident.value)}`;

  function navigationToIncidents() {
    navigation.navigate("Incidents");
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title} `,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=+55${incident.whatsapp}?text=${message}`
    );
  }
  return (
    <View style={styles.constainer}>
      <View style={styles.header}>
        <Image source={longoImg} />

        <TouchableOpacity onPress={navigationToIncidents}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR</Text>
        <Text style={styles.incidentValue}>
          {formatadorMoeda(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia.</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
