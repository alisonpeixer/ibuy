import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral[100],
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  descricao: {
    fontWeight: "500",
  },
  codigo: {
    fontSize: 10,
    fontWeight: "200",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 70,
    height: 70,
  },
  info: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  summary: {
    backgroundColor: colors.neutral[100],
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  total: {
    fontSize: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    height: 200,
    justifyContent: "center",
  },
});



export default styles;