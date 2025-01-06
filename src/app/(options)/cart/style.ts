import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    marginBottom: 10, 
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    width: '100%', 
    justifyContent: 'space-between', 
    borderWidth: 0.8, 
    borderColor: colors.neutral[200],
    gap: 20
  },
  cardItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  footer: {
    backgroundColor: colors.neutral[50],
    padding: 10,
    borderRadius: 10,
    justifyContent:'space-between',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%'

  },
  headerContainer: {height: 50, justifyContent: 'center', paddingLeft: 10, borderBottomWidth: 0.2, borderColor: colors.neutral[400], backgroundColor:'#fff'}

});


export default style;