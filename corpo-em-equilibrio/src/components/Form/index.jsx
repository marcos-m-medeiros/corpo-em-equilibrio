import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Vibration,
  Pressable,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState(
    "Informe a sua altura e peso..."
  );
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);

  function imcCalculator() {
    return setImc(
      (
        (weight.replace(",", ".") * 1) /
        (height.replace(",", ".") * 1 * (height.replace(",", ".") * 1))
      ).toFixed(2)
    );
  }

  function verificationImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("Campo obrigatório*");
    }
  }

  function validationImc() {
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("O seu índice de massa corporal (IMC) é:");
      setTextButton("Calcular Novamente");
      Keyboard.dismiss();
      setErrorMessage(null);
      return;
    }
    verificationImc();
    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Informe a sua altura e peso...");
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 75.3"
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
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </Pressable>
  );
}
