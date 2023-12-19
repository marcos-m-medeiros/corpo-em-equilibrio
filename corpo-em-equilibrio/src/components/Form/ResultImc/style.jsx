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
});

export default styles;
