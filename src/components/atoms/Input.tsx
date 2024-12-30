import React from "react";
import { colors } from "@/styles/colors";
import { Context } from "react";
import { Control, Controller, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, Text, View, ViewStyle, StyleProp, FlexStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";


interface SimpleInput {

}

interface FormInput {
    name?: string;
    control?: Control<any>;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    errors?: FieldErrors<any>;
}


export interface Props extends TextInputProps {
    name?: string;
    control?: Control<any>;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    errors?: FieldErrors<any>;
    customStyle?: StyleProp<ViewStyle | FlexStyle>;
    icon?: keyof typeof Ionicons.glyphMap;
    size?: number;
    type?: 'simple' |  'form'
}


export function Input({type='simple',icon,size,control,errors,name,rules,customStyle, ...props}:Props) {

    const formInput = () => (errors && name) && ( 
        <View style={{width: '100%'}}>
            <Controller
                control={control}
                rules={rules}
                name={name}
                render={({ field: { onChange, value } })=>(
                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        style={style.input}
                        {...props}
                    />
                )}
            />
            <View >
                {errors[name]?.message && (
                    <Text style={{ color: 'red' }}>
                        {typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
                    </Text>
                )}
            </View>
    
        </View>
    );

    const simpleInput = () => (
        <View style={[style.inputContainer,customStyle, customStyle]}>
            <TextInput style={style.searchInput} {...props}/>
            <Ionicons name={icon} size={size} style={style.icon} />
        </View>
    )

    return (type === 'simple' ? simpleInput() : formInput());
}


const style = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    input: {
        height: 50,
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        borderColor: colors.neutral[200],
        padding: 14,
        fontFamily: 'Inter-Regular',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
      },
      searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
      },
      icon: {
        marginLeft: 10, // Espaçamento entre o campo de texto e o ícone
      },
})