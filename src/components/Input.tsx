import React from "react";
import { colors } from "@/styles/colors";
import { Context } from "react";
import { Control, Controller, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, Text, View } from "react-native";



export interface Props extends TextInputProps {
    name: string;
    control: Control<any>;
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
    errors: FieldErrors<any>;
}


export function Input({name,control, rules, errors, ...props}:Props) {
    return (
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
            <View style={{ width: '100%', height: 20, marginTop: 5, marginBottom: 10 }}>
                {errors[name]?.message && (
                    <Text style={{ color: 'red' }}>
                        {typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
                    </Text>
                )}
            </View>

        </View>
    )
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
    }
})