//# Libs
import React, { useState } from 'react';
import * as yup from 'yup';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

//# Local
import { api } from '@/services/api';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Container } from '@/components/molecules/Container';

const schema = yup.object().shape({
    username: yup.string().required('Nome de usuário é obrigatório'),
    email: yup.string().required('E-mail é obrigatório').email('Formato de e-mail inválido'),
    firstName: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    password: yup.string().required('Senha é obrigatória').min(8, 'Tamanho mínimo da senha é 8 caracteres'),
    image: yup.mixed().nullable(),
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
        const formData = new FormData();
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

        try {
            await api.postForm('auth/register', formData);
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', JSON.stringify(error));
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
        });

        if (!result.canceled) {
            setValue('image', result.assets[0]);
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Container customStyle={styles.container} showNavHeader={true}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Input
                    control={control}
                    name='username'
                    rules={{ required: true }}
                    placeholder='Nome de usuário'
                    autoCapitalize='none'
                    errors={errors}
                    type="form"
                />
                <Input
                    control={control}
                    name='email'
                    rules={{ required: true }}
                    placeholder='E-mail'
                    autoCapitalize='none'
                    errors={errors}
                    type="form"
                />
                <Input
                    control={control}
                    name='firstName'
                    rules={{ required: true }}
                    placeholder='Nome'
                    autoCapitalize='none'
                    errors={errors}
                    type="form"
                />
                <Input
                    control={control}
                    name='lastName'
                    rules={{ required: true }}
                    placeholder='Sobrenome'
                    autoCapitalize='none'
                    errors={errors}
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
                    label='Anexar Imagem de Perfil'
                    onPress={pickImage}
                    style={styles.imageButton}
                />

                {image && <Image source={{ uri: image }} style={styles.image} />}

                <Button
                    label='Registrar-se'
                    onPress={handleSubmit(onPressSend)}
                    disabled={!isValid || isSubmitting}
                    customStyle={styles.submitButton}
                />
            </ScrollView>

            <View style={styles.footer}>
                <Link href="/sign-in" style={styles.link}>
                    <Text style={styles.linkText}>Já tenho uma conta. <Text style={styles.linkHighlight}>Logar</Text></Text>
                </Link>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: 'auto'
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        gap: 20,
    },
    imageButton: {
        backgroundColor: '#007bff',
        marginTop: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 15,
        alignSelf: 'center',
    },
    submitButton: {
        marginTop: 20,
    },
    footer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    link: {
        textAlign: 'center',
    },
    linkText: {
        color: '#6c757d',
    },
    linkHighlight: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});
