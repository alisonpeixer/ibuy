import { Input } from "@/components/atoms/Input";
import { Container } from "@/components/molecules/Container"
import { apiAuth } from "@/services/auth";
import { viweStyle } from "@/styles/viwe";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react"
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import * as ImagePicker from 'expo-image-picker';
import { api } from "@/services/api";
import { SplashScreen } from "expo-router";

import * as FileSystem from 'expo-file-system'

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username e Obrigatorio'),
  email: yup
    .string()
    .required('Email e Obrigatorio'),
  firstName: yup
    .string()
    .required('Nome e Obrigatorio'),
  lastName: yup
    .string()
    .required('Sobre Nome e Obrigatorio'),
  image: yup.mixed().nullable()
});



export default function Profile() {
  const [user, setUser] = useState<User>();
  const [image, setImage] = useState<string>('');


  const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      firstName: user?.first_name,
      lastName: user?.last_name,
      image: ''
    },
  });


  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 4],
      quality: 1
    });

    if (result.assets) {
      if(((result.assets[0]?.fileSize || 0)) > (5 * 1024 * 1024)){
        return Alert.alert('A imagem é muito grande. O tamanho máximo permitido é 5MB.')
      }

      if (!result.canceled) {
        setValue('image', result.assets[0]);
        setImage(result.assets[0].uri);
      }
    }
  };


  const getUser = async () => {
    setUser(undefined);

    apiAuth.user()
      .then(({ data }) => {

        setUser(() => data);
        setImage(data.image || '');


        setValue("username", data.username);
        setValue("email", data.email);
        setValue("firstName", data.first_name);
        setValue("lastName", data.last_name);

        trigger();


      })
      .catch(error => {

        Alert.alert('ERRO', JSON.stringify(error.response['data']));
      });
  }

  const onPressSend = async (body: any) => {
  

    const formData = new FormData();
    formData.append("email", body.email);
    formData.append("first_name", body.firstName);
    formData.append("last_name", body.lastName);
    formData.append("username", body.username);


    const { uri, fileName, mimeType } = body.image;

    if (fileName && uri && mimeType) {
      formData.append("image", {
        name: fileName,
        uri: uri,
        type: mimeType
      } as any);
    }


    await api.putForm('auth/custom/user/', formData)
      .then(() => {
        getUser();
        Alert.alert('REGISTRO', 'Usuário atualizado com sucesso.');

      })
      .catch((error) => {
        Alert.alert('ERRO', JSON.stringify(error.response['data']));
        
      })

  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <Container showNavHeader={true}>
      <View style={[{ width: '100%', justifyContent: 'center', alignItems: 'center', gap: 20 }]}>
        <TouchableOpacity style={{ borderRadius: 900, borderWidth: 0.3, width: 200, height: 200 }} onPress={pickImage}>
          <Image src={image} style={[{ borderRadius: 900, borderWidth: 0.3, width: 200, height: 200 }]} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '500', fontSize: 30 }}>{user?.first_name} {user?.last_name}</Text>
      </View>

      <View style={{ gap: 40, marginTop: 40 }}>
        <Input
          control={control}
          name='username'
          placeholder='Username'
          autoCapitalize='none'
          errors={errors}
          readOnly={true}
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
      </View>
      <View style={{ height: 100, justifyContent: 'center' }}>
        <Button
          label='Salvar'
          onPress={handleSubmit(onPressSend)}
          disabled={!isValid}
          loading={isSubmitting}
        />
      </View>


    </Container>
  )
}