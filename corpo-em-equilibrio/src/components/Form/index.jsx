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
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(null);
  const [errorAgeMessage, setErrorAgeMessage] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  function selectGender(selectedGender) {
    setGender(selectedGender);
  }

  function imcCalculator() {
    let heightFormat;
    if (height) {
      const heightWithDot = height.replace(",", ".");
      heightFormat =
        parseFloat(heightWithDot) / (heightWithDot.includes(".") ? 1 : 100);
    } else {
      heightFormat = null;
    }

    if (isNaN(heightFormat)) {
      console.error("Erro ao converter altura para metros");
      return;
    }

    const totalImc = weight / (heightFormat * heightFormat);

    if (isNaN(totalImc) || !isFinite(totalImc)) {
      console.error("Erro no cálculo do IMC");
      return;
    }

    const roundedImc = parseFloat(totalImc.toFixed(2));

    setImcList((arr) => [
      ...arr,
      { id: new Date().getTime(), imc: roundedImc },
    ]);
    setImc(roundedImc);
  }

  function verificationImc() {
    Vibration.vibrate();
  }

  function validationImc() {
    if (weight !== null && height !== null && age !== null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setGender(null);
      setAge(null);
      setMessageImc("O seu índice de massa corporal (IMC) é:");
      setTextButton("Calcular Novamente");
      setErrorHeightMessage(null);
      setErrorWeightMessage(null);
      setErrorAgeMessage(null);
      setIsFirstTime(true);
    } else {
      // Verifica se é a primeira vez antes de exibir mensagens de erro
      if (textButton !== "Calcular Novamente" && isFirstTime) {
        setErrorHeightMessage(height === null ? "Campo obrigatório*" : null);
        setErrorWeightMessage(weight === null ? "Campo obrigatório*" : null);
        setErrorAgeMessage(age === null ? "Campo obrigatório*" : null);
        setIsFirstTime(false);
        verificationImc();
      }

      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Informe a sua altura, peso, gênero e idade...");
    }
  }

  function removeImc(index) {
    const newList = [...imcList];
    newList.splice(index, 1); // Remove o item no índice especificado
    setImcList(newList);
  }

  return (
    <View style={styles.formContext}>
      {imc === null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <View style={styles.genderButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "male" && styles.selectedGenderButton,
              ]}
              onPress={() => selectGender("male")}
            >
              <Text style={styles.genderButtonText}>Homem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === "female" && styles.selectedGenderButton,
              ]}
              onPress={() => selectGender("female")}
            >
              <Text style={styles.genderButtonText}>Mulher</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorHeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 165"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorWeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex: 62,5"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Idade</Text>
          <Text style={styles.errorMessage}>{errorAgeMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="Ex: 23"
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
        renderItem={({ item, index }) => (
          <View style={styles.resultImcItemContainer}>
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC = </Text>
              {item.imc} kg/m²
            </Text>
            {textButton === "Calcular" && (
              <TouchableOpacity
                style={styles.removeImcButton}
                onPress={() => {
                  removeImc(index);
                }}
              >
                <Text style={styles.removeImcButtonText}>Remover</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
