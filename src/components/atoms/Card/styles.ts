import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: { 
    backgroundColor: colors.neutral[100], 
    borderColor: colors.neutral[400],
    borderWidth: 0.4, 
    width: 200, 
    marginRight: 20, 
    borderRadius: 20, 
    padding: 10, 
    height: 300,
    gap: 10,
  },
  cardHeader: {
    height: '60%'
  },
  cardBody:{

  },
  cardFooter:{

  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }
});


export default styles;