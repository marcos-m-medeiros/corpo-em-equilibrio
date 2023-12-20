import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  Vibration,
  FlatList,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(props) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [messageImc, setMessageImc] = useState(
    "Informe a sua altura e peso..."
  );
  const [imc, setImc] = useState("");
  const [textButton, setTextButton] = useState("Calcular");
  const [errorHeightMessage, setErrorHeightMessage] = useState("");
  const [errorWeightMessage, setErrorWeightMessage] = useState("");
  const [imcList, setImcList] = useState([]);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [errorAgeMessage, setErrorAgeMessage] = useState("");
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
      heightFormat = "";
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
    if (weight !== "" && height !== "" && age !== "") {
      imcCalculator();
      setHeight("");
      setWeight("");
      setGender("");
      setAge("");
      setMessageImc("O seu índice de massa corporal (IMC) é:");
      setTextButton("Calcular Novamente");
      setErrorHeightMessage("");
      setErrorWeightMessage("");
      setErrorAgeMessage("");
      setIsFirstTime(true);
    } else {
      // Verifica se é a primeira vez antes de exibir mensagens de erro
      if (textButton !== "Calcular Novamente" && isFirstTime) {
        setErrorHeightMessage(height === "" ? "Campo obrigatório*" : "");
        setErrorWeightMessage(weight === "" ? "Campo obrigatório*" : "");
        setErrorAgeMessage(age === "" ? "Campo obrigatório*" : "");
        setIsFirstTime(false);
        verificationImc();
      }

      setImc("");
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
      {imc === "" ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <View style={styles.genderButtonsContainer}>
            <Pressable
              style={[
                styles.genderButton,
                gender === "male" && styles.selectedGenderButton,
              ]}
              onPress={() => selectGender("male")}
            >
              <Text style={styles.genderButtonText}>Homem</Text>
            </Pressable>
            <Pressable
              style={[
                styles.genderButton,
                gender === "female" && styles.selectedGenderButton,
              ]}
              onPress={() => selectGender("female")}
            >
              <Text style={styles.genderButtonText}>Mulher</Text>
            </Pressable>
          </View>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorHeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 165"
            inputMode="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorWeightMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex: 62,5"
            inputMode="numeric"
          />
          <Text style={styles.formLabel}>Idade</Text>
          <Text style={styles.errorMessage}>{errorAgeMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAge}
            value={age}
            placeholder="Ex: 23"
            inputMode="numeric"
          />
          <Pressable
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </Pressable>
        </Pressable>
      ) : (
        <View style={styles.exhibitionResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <Pressable
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </Pressable>
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
              <Pressable
                style={styles.removeImcButton}
                onPress={() => {
                  removeImc(index);
                }}
              >
                <Text style={styles.removeImcButtonText}>Remover</Text>
              </Pressable>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
