import { colors } from "@/styles/colors";
import { TouchableOpacity,Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, FlexStyle } from "react-native";

export interface Props extends TouchableOpacityProps  {
    text: string;
    type?: 'primary' | 'outline',
    customStyle?: StyleProp<ViewStyle | FlexStyle>;
    disabled?: boolean;
}

export function Button({text,type,customStyle,disabled=false,...props}: Props) {
    const styleButton = disabled ?  style.disabled  : style[type || 'primary'];

    
    
    return (
        <TouchableOpacity style={[styleButton,customStyle]} disabled={disabled} {...props}>
            <Text style={style.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    primary: {
        backgroundColor: colors.blue[400],
        width: '100%',
        borderRadius: 30,
        height: 44,
        alignContent: 'center',
        justifyContent: 'center',

    },
    disabled: {
        backgroundColor: colors.neutral[200],
        width: '100%',
        borderRadius: 30,
        height: 44,
        alignContent: 'center',
        justifyContent: 'center'

    },
    outline: {
        borderColor: colors.blue[400],
        borderWidth: 1,
        width: '100%',
        borderRadius: 30,
        height: 44,
        alignContent: 'center',
        justifyContent: 'center',
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "300"
    }
})