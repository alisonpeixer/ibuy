//# Libs
import React, { useState } from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, router } from "expo-router";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

//# Local
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiAuth, storageAuth } from "@/services/auth";
import { Container } from "@/components/molecules/Container";
import Toast from "react-native-toast-message";

//# Schema de validação
const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Login é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória')
        .min(8, 'Tamanho mínimo da senha é 8 caracteres'),
});

export default function SignIn() {
    const [response,setResponse] = useState<string>('');

    const { control, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });


    const onPressSend = async (body: any) => {
        setResponse('');
        
        apiAuth.login(body).then(({data}) => {
       
            Toast.show({
              type: 'success',
              text1: 'Bem-Vindo(a)!',
              text2: 'Login efetuado com sucesso! 😊',
              position: 'bottom',
              visibilityTime: 3000,
            });

     
            storageAuth.login(data);
            router.push('/(options)');
        }).catch((error) => {
            let erros = '';

            if(error.response['data']['non_field_errors'].length > 0){
                for(const item of error.response['data']['non_field_errors']){
                    erros += `${item}\n`;
                }
            } else {
                erros = error.response['data'];
            }

            setResponse(erros);

            Toast.show({
              type: 'error',
              text1: 'Erro no login',
              text2: error.response ? JSON.stringify(erros) : 'Erro desconhecido',
              position: 'top',
              visibilityTime: 3000,
              autoHide: true,
            });
        });
    }

    return (
        <Container showNav={false} showNavHeader={true}>
            <View style={styles.header}>
                <Image source={require('@/images/power_buy.png')} style={styles.logo} />
            </View>

            <View style={styles.formContainer}>
                <Input
                    control={control}
                    name='email'
                    rules={{ required: true }}
                    errors={errors}
                    placeholder='E-mail'
                    autoCapitalize='none'
                    type="form"
                />
                <Input
                    control={control}
                    name='password'
                    rules={{ required: true }}
                    placeholder='Senha'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    errors={errors}
                    type="form"
                />
                <Button
                    label='Logar'
                    onPress={handleSubmit(onPressSend)}
                    disabled={!isValid || isSubmitting}
                />
                {response.length > 0 && <Text style={{ color:'red', textAlign: 'center' }}>{response}</Text>}
            </View>

            <View style={styles.footerContainer}>
                <Link href="/sign-up" style={styles.link}>
                    <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.registerLink}>Registre-se.</Text></Text>
                </Link>
            </View>
        </Container>
    );
}

// Estilos ajustados
const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 300,
        height: 80,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        justifyContent: 'space-evenly',
        gap: 20,
        marginBottom: 40,
    },
    footerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    link: {
        textAlign: 'center',
        fontSize: 16,
    },
    registerText: {
        color: '#6e6e6e',
    },
    registerLink: {
        color: '#1e90ff',
        fontWeight: 'bold',
    },
});
