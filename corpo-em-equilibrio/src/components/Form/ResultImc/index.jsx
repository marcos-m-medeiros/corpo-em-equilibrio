import React from "react";
import { View, Text, Pressable, Share } from "react-native";
import { getclassificationImc } from "../../utils";
import styles from "./style";

export default function ResultImc(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: "Meu IMC hoje é: " + props.resultImc + " kg/m².",
    });
  };

  const { classification, colorClassification, informativeMessage } =
    getclassificationImc(props.resultImc);

  return (
    <View style={styles.resultImc}>
      <View style={styles.boxShareButton}>
        <Text style={styles.information}>{props.messageResultImc}</Text>
        <Text style={styles.numberImc}>{props.resultImc} kg/m².</Text>
        <Text
          style={{
            ...styles.classificationImc,
            color: colorClassification,
          }}
        >
          {`Classificação: ${classification}`}
        </Text>
        <Text style={styles.informativeMessage}>{informativeMessage}</Text>
        <Pressable
          onPress={onShare}
          style={({ pressed }) => [
            styles.shared,
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text style={styles.sharedText}>Compartilhar</Text>
        </Pressable>
      </View>
    </View>
  );
}
