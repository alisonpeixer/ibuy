import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const viweStyle = StyleSheet.create({
    backBlur: {
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.4,
        shadowRadius: 12, 
        elevation: 8,
      },
    backBlurBottom: {
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 5, 
    },
    backBlurTop: {
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 5, 
    },

})