import React from 'react'

import { Href, Link, useNavigation, useSegments } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/colors'
import { navigate, NavigationOptions } from 'expo-router/build/global-state/routing'
import { LinearGradient } from 'expo-linear-gradient';

import { SvgXml } from 'react-native-svg';
import { Container } from '@/components/molecules/Container'
import { Button } from '@/components/atoms/Button'
import { viweStyle } from '@/styles/viwe'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { apiAuth, storageAuth } from '@/services/auth'
import { User } from '@/types/user'

export default function Index() {
    const segments = useSegments();
    const [user, setUser] = useState<User>();

    const onPressCardUser = () => {
        if(!user?.pk) {
            router.push('/(options)/(auth)/sign-in');
        } else {
            router.push('/(options)/profile');
        }
    }


    function logout() {
        apiAuth.logout()
        .then(() => {
            setUser(undefined);
            storageAuth.logout();
        })
        .catch(err => (
            console.log(err)
        ));
    }


    useEffect(() => {
        setUser(undefined);

        apiAuth.user()
        .then(({ data }) => {
            setUser(data);
        })
        .catch(err => (
            err && console.log(err)
        ));
    }, [segments]);



    return (
        <Container customStyle={{ padding: 0 }}>
            <View style={[style.headerContainer, viweStyle.backBlur]}>
                <Text style={{ fontSize: 17, fontWeight: '400' }}>Mais Opções</Text>
            </View>

            <View style={{height:100}}>
                <TouchableOpacity style={style.inputContainer} onPress={onPressCardUser}>
                    <View style={{ flex: 1 }}>
                        

                        { user?.image ?
                            <Image src={user?.image} style={{width: 70, height: 70, borderRadius: 90}}/>
                            :
                            <Ionicons name="person-circle" size={70} />
                        }

                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Olá, {(user?.pk) ? `${user?.first_name || 'USER'} ${user?.last_name || ''}` : "Visitante"}!</Text>
                        <Text>{(user?.pk) ? "Editar seu perfil." : "Faça login para acessar seu perfil."}</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-forward-outline" size={30} />
                    </View>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={style.cardOption} onPress={()=> router.push('/(options)/cart')}>
                <View style={{ width: '10%' }}>
                    <Ionicons name="cube-outline" size={30} />
                </View>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontSize: 20, fontWeight: '400' }}>Pedidos</Text>
                </View>
                
            </TouchableOpacity>

            <View style={{height:'60%', flexDirection: 'column-reverse', padding: 10}}>
                {(user?.pk) &&
                    <>
                        <Button
                            label='SAIR'
                            onPress={logout}
                            activeOpacity={0.7}
                            type='danger'
                        />
                    </>
                }
            </View>



        </Container>
    )
}


const style = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.4,
        borderColor: colors.neutral[200],
        marginTop: 10,
        paddingLeft: 10
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomWidth: 0.2,
        borderColor: colors.neutral[400],
        backgroundColor: '#fff'
    },
    cardOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: colors.neutral[200],
        padding: 10,

    }


})