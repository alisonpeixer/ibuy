//# Libs
import React, { useState } from 'react';

import * as yup from 'yup';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

//# Local
import { api } from '@/services/api';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { HeaderAuthScreen } from '@/components/molecules/Header';




const schema = yup.object().shape({
    username: yup
        .string()
        .required('Nome de Usuario e Obrigatorio'),
    email: yup
        .string()
        .required('Email e Obrigatorio')
        .email('Formato `Email` invalido.'),
    firstName: yup
        .string()
        .required('Nome e Obrigatorio'),
    lastName: yup
        .string()
        .required('Sobre Nome e Obrigatorio'),
    password: yup
        .string()
        .required('Senha e Obrigatorio')
        .min(8, 'Tamnho minimo da senha "8 Caracteres"'),
    image: yup.mixed().nullable()
});

export default function SignUp() {
    const [image, setImage] = useState<string | null>(null);

    const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            image: ''
        },
    });

    const onPressSend = async (body: any) => {


        const formData = new FormData(body);

        formData.append("email", body.email);
        formData.append("first_name", body.firstName);
        formData.append("last_name", body.lastName);
        formData.append("username", body.username);
        formData.append("password", body.password);

        const { uri, fileName, mimeType } = body.image;

        if (fileName && uri && mimeType) {
            formData.append("image", {
                name: fileName,
                uri: uri,
                type: mimeType
            } as any);
        }

        await api.postForm('auth/register', formData)
        .then(({data})=>{
            Alert.alert('REGISTRO', 'Usuário cadastrado com sucesso.');
        })
        .catch((error)=>{
            Alert.alert('ERRO', JSON.stringify(error));
        })

    }


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            allowsMultipleSelection: false
        });

        if (!result.canceled) {
            setValue('image', result.assets[0]);
            setImage(result.assets[0].uri);
        }
    };


    return (
        <>
            <HeaderAuthScreen />
            <ScrollView style={{ flex: 1, padding: 10, height: 'auto' }}>
                <View style={{gap: 30}}>
                    <Input
                        control={control}
                        name='username'
                        rules={{
                            required: true
                        }}
                        placeholder='Username'
                        autoCapitalize='none'
                        errors={errors}
                        type="form"
                    />
                    <Input
                        control={control}
                        name='email'
                        rules={{
                            required: true
                        }}
                        placeholder='Email'
                        autoCapitalize='none'
                        errors={errors}
                        type="form"
                    />
                    <Input
                        control={control}
                        name='firstName'
                        rules={{
                            required: true
                        }}
                        placeholder='Nome'
                        autoCapitalize='none'
                        errors={errors}
                        type="form"
                    />
                    <Input
                        control={control}
                        name='lastName'
                        rules={{
                            required: true
                        }}
                        placeholder='Sobrenome'
                        autoCapitalize='none'
                        errors={errors}
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
                        label='Anexar Imagem Pefil'
                        onPress={() => pickImage()}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>

                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

                <View style={{ height: 200, gap: 40, marginTop: 30 }}>
                    <Button
                        label='Registrar-se'
                        onPress={handleSubmit(onPressSend)}
                        disabled={!isValid || isSubmitting}
                    />

                    <Link href="/sign-in" style={{ textAlign: 'center' }}>
                        Já tenho uma conta <Text style={{ color: 'blue' }}> Logar.</Text>
                    </Link>
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 900
    },
});