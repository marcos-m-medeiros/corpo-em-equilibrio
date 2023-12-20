import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  resultImc: {
    flex: 1,
    marginTop: 15,
    paddingTop: 60,
    borderRadius: 50,
    alignItems: "center",
    width: "100%",
  },
  numberImc: {
    fontSize: 48,
    color: "#91ac9b",
    fontWeight: "bold",
  },
  information: {
    fontSize: 18,
    color: "#a9c3b6",
    fontWeight: "bold",
  },
  boxShareButton: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  shared: {
    backgroundColor: "#729bad",
    borderRadius: 50,
    paddingBottom: 5,
    paddingTop: 5,
  },
  sharedText: {
    color: "#ffffff",
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  classificationImc: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    color: "#444",
  },
  informativeMessage: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
    margin: 15,
  },
});

export default styles;
