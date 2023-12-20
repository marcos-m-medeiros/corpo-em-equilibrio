import React from "react";
import { View, Image } from "react-native";
import styles from "./style";

export default function Title() {
  return (
    <View style={styles.boxTitle}>
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logoImage}
      />
    </View>
  );
}
