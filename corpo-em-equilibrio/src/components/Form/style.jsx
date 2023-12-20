import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  formContext: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 4,
  },
  form: {
    width: "90%",
  },
  formLabel: {
    color: "#729bad",
    fontSize: 18,
    paddingLeft: 20,
  },
  input: {
    width: "90%",
    borderRadius: 50,
    backgroundColor: "#f6f6f6",
    color: "#a7c3ce",
    height: 40,
    margin: 10,
    paddingLeft: 10,
  },
  buttonCalculator: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#7ba7ba",
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 12,
    marginTop: 30,
  },
  textButtonCalculator: {
    fontSize: 20,
    color: "#ffffff",
  },
  errorMessage: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  exhibitionResultImc: {
    width: "100%",
    height: "55%",
  },
  listImcs: {
    marginTop: 20,
  },
  resultImcItem: {
    fontSize: 18,
    color: "#91AC9B",
    height: 50,
    width: "100%",
    paddingRight: 20,
    fontWeight: "bold",
    paddingTop: 22,
  },
  textResultItemList: {
    fontSize: 16,
    color: "#A9C3B6",
    fontWeight: "600",
  },
  removeImcButton: {
    backgroundColor: "#ff6961",
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    alignItems: "center",
  },

  removeImcButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  genderButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  genderButton: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#cddfdf",
    paddingVertical: 14,
    marginHorizontal: 5,
    alignItems: "center",
    marginBottom: 20,
  },

  selectedGenderButton: {
    backgroundColor: "#7ba7ba",
  },

  genderButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default styles;
