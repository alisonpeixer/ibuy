import React, { useCallback, useEffect } from "react";

import { View, Image, Text, TouchableOpacity, Alert } from 'react-native'

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container } from "@/components/Container";
import { Link,router} from "expo-router";


import * as SecureStore from 'expo-secure-store';

import { HeaderAuthScreen } from "../fragments/Header";
import { api } from "@/services/api";


const schema = yup.object().shape({
    email: yup
        .string()
        .required('Login e Obrigatorio'),
    password: yup
        .string()
        .required('Senha e Obrigatorio')
        .min(1, 'Tamnho minimo da senha "8 Caracteres"'),
});

export default function SignIn() {


    const { control, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onPressSend = async (body: any) => {
        await api.postForm('auth/v1/login/',body).then( async ({data})=>{
            await SecureStore.setItemAsync('auth', JSON.stringify(data['access']));
            await SecureStore.setItemAsync('refresh', JSON.stringify(data['refresh']));

            await SecureStore.setItemAsync('user', JSON.stringify(data['user']));
            router.push('/(options)')

        }).catch((erro)=>{
            console.log(erro);
            Alert.alert('ERRO', `Erro ao efetuar o Login.\n${JSON.stringify(erro)}`);
        
        });
    }



    return (
        <Container showNav={false}>
            <HeaderAuthScreen/>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('@/images/power_buy.png')} style={{width: 355, height: 81}} />
            </View>

            <View style={{height: '40%'}}>
                <Input 
                    control={control}
                    name='email'
                    rules={{
                    required: true
                    }}
                    placeholder='E-mail'
                    autoCapitalize='none'
                    errors={errors}
                />
                <Input 
                    control={control}
                    name='password'
                    rules={{
                        required: true
                    }}
                    placeholder='Senha'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    errors={errors}
                />
                <Button
                    text='Logar'
                    onPress={handleSubmit(onPressSend)}
                    disabled={!isValid || isSubmitting}
                />
            </View>
            <View style={{height: '20%',gap: 20, justifyContent: 'center'}}>
                <Link href="/sign-up" style={{textAlign: 'center'}}>
                    Não possui uma conta? <Text  style={{color:'blue'}}> Registra-se.</Text>
                </Link>
            </View>
        </Container>
    )
}
