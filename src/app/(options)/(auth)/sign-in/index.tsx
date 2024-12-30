//# Libs
import React from "react";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link,router, useNavigation} from "expo-router";
import { View, Image, Text, Alert } from 'react-native'

//# Local
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { apiAuth, storageAuth } from "@/services/auth";
import { Container } from "@/components/molecules/Container";
import { HeaderAuthScreen } from "@/components/molecules/Header";



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
        apiAuth.login(body).then(({data})=>{
            storageAuth.login(data);
            router.push('/(options)');

        }).catch((error)=>{
            console.log(error);
            Alert.alert('ERRO', `Erro ao efetuar o Login.\n${JSON.stringify(error.response['data'])}`);
        });
    }

    return (
        <>
            <Container showNav={false}>
                <HeaderAuthScreen/>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('@/images/power_buy.png')} style={{width: 355, height: 81}} />
                </View>

                <View style={{height: '40%', gap: 20}}>
                    <Input 
                        control={control}
                        name='email'
                        rules={{
                            required: true
                        }}
                        errors={errors}
                        placeholder='E-mail'
                        autoCapitalize='none'
                        type="form"
                        
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
                        type="form"
                    />
                    <Button
                        label='Logar'
                        onPress={handleSubmit(onPressSend)}
                        disabled={!isValid || isSubmitting}
                    />
                </View>
                <View style={{height: 100,gap: 20, justifyContent: 'center'}}>
                    <Link href="/sign-up" style={{textAlign: 'center'}}>
                        Não possui uma conta? <Text  style={{color:'blue'}}> Registra-se.</Text>
                    </Link>
                </View>
            </Container>
        
        </>
    )
}

