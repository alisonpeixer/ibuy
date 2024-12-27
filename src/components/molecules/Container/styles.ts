import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    fontFamily: 'Inter_400Regular',
    backgroundColor: colors.neutral[50]
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: colors.neutral[50]
  },
  headerContent: {
    width: '100%',
    position: 'relative',
    height: 50,
    backgroundColor: colors.neutral[50],
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
    paddingInline: 12,
  },
  headerBackBtn: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconTextColorMenu: {
    color: colors.neutral[400]
  },
  textMenu: {
    fontSize: 10, 
    textAlign: 'center'
  },
  iconColorMenu: {
    color: colors.neutral[400]
  },
  iconColorMenuActived: {
    color: colors.neutral[700]
  },
  textMenuAtived: {
    fontSize: 10, 
    textAlign: 'center'
  }
});


export default style;