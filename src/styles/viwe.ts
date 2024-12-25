import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const viweStyle = StyleSheet.create({
    backBlur: {
        // Efeito de sombra para iOS
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 4 }, // Direção da sombra (ajustado para ficar equilibrado)
        shadowOpacity: 0.4, // Opacidade da sombra
        shadowRadius: 12, // Aumentado para difundir melhor a sombra
    
        // Efeito de sombra para Android
        elevation: 8, // Intensidade da sombra no Android
      },
    backBlurBottom: {

        // efeito de sombra para iOS
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 4 }, // Direção da sombra (horizontal e vertical)
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 8, // Raio da sombra (espessura)
        
        // efeito de sombra para Android
        elevation: 5, // Intensidade da sombra no Android
    },
    backBlurTop: {

        // efeito de sombra para iOS
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 4 }, // Direção da sombra (horizontal e vertical)
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 8, // Raio da sombra (espessura)
        
        // efeito de sombra para Android
        elevation: 5, // Intensidade da sombra no Android
    },

})