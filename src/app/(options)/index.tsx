import { Href, Link, useNavigation } from 'expo-router'
import { View,Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/colors'
import { navigate, NavigationOptions } from 'expo-router/build/global-state/routing'

import { SvgXml } from 'react-native-svg';
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { viweStyle } from '@/styles/viwe'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react'

export default function Index() {

    const [user,setUser] = useState<any>({});

    useEffect(()=> {
        getUser();
    },[]);

    function getUser() {
        const userData = SecureStore.getItem('user');

        if(userData) {
            setUser(JSON.parse(userData));
        }


    }

    const goTo = (href: Href, options?: NavigationOptions) => {
        return router.navigate(href);
    }

    async function logout() {
        await SecureStore.deleteItemAsync('auth');
        await SecureStore.deleteItemAsync('refresh');
        await SecureStore.deleteItemAsync('user');

        setUser({});
    }

    

    return (
        <Container customStyle={{padding: 0}}>
            <View style={[style.headerContainer, viweStyle.backBlur]}>
                <Text style={{fontSize: 17, fontWeight: '400' }}>Mais Opções</Text>
            </View>
            { (!user.email) ? 
                <TouchableOpacity style={style.inputContainer} onPress={()=> goTo('/(options)/(auth)/sign-in')}>
                    <View style={{flex: 1}}>
                        <Ionicons name="person-circle" size={70} />
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{fontSize: 20, fontWeight: '600' }}>Olá, Visitante!</Text>
                        <Text>Faça login para acessar seu perfil.</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-forward-outline" size={30} />
                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity style={style.inputContainer} >
                    <View style={{flex: 1}}>
                        <Ionicons name="person-circle" size={70} />
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{fontSize: 20, fontWeight: '600' }}>Olá, {user['first_name'] || 'USER'} {user['last_name'] || ''}!</Text>
                        <Text>Editar seu perfil.</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-forward-outline" size={30} />
                    </View>
                </TouchableOpacity>

            }
            
            {   (user.email) && 
                <View style={{height: '82%', justifyContent: 'space-between', flexDirection: 'column-reverse'}}>
                    <TouchableOpacity style={[{padding: 10, backgroundColor: colors.neutral[100], borderWidth: 0.2}, viweStyle.backBlur]} onPress={logout}>
                        <Text style={{fontSize: 20, color: 'red'}}>SAIR</Text>
                    </TouchableOpacity>
                </View>
            }
            
            
        
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
        marginTop: 10
    },
    headerContainer: {height: 50, justifyContent: 'center', paddingLeft: 10, borderBottomWidth: 0.2, borderColor: colors.neutral[400], backgroundColor:'#fff'}


})