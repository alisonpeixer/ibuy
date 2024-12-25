import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  backButton: { 

    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: '100%', 
    borderColor: colors.neutral[400],
    backgroundColor: '#fff'
  }
});


export default style;