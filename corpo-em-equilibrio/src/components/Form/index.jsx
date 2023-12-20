import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Vibration,
  Pressable,
  FlatList,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(props) {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState(
    "Informe a sua altura e peso..."
  );
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorHeightMessage, setErrorHeightMessage] = useState(null);
  const [errorWeightMessage, setErrorWeightMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalculator() {
    const heightFormat = height.replace(",", ".");
    const totalImc = (weight / (heightFormat * heightFormat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    setImc(totalImc);
  }

  function verificationImc() {
    Vibration.vibrate();
  }

  function validationImc() {
    if (weight !== null && height !== null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("O seu índice de massa corporal (IMC) é:");
      setTextButton("Calcular Novamente");
      setErrorHeightMessage(null);
      setErrorWeightMessage(null);
    } else {
      // Verifica se é a primeira vez antes de exibir mensagens de erro
      if (textButton !== "Calcular Novamente") {
        setErrorHeightMessage(height === null ? "Campo obrigatório*" : null);
        setErrorWeightMessage(weight === null ? "Campo obrigatório*" : null);
        verificationImc();
      }

      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Informe a sua altura e peso...");
    }
  }

  return (
    <View style={styles.formContext}>
      {imc === null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorHeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 1.75"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorWeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex: 75.3"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exhibitionResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => (
          <Text style={styles.resultImcItem}>
            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
            {item.imc}
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
