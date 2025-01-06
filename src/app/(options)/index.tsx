import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/styles/colors'
import { viweStyle } from '@/styles/viwe'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as SecureStore from 'expo-secure-store'
import { apiAuth, storageAuth } from '@/services/auth'
import { User } from '@/types/user'
import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/molecules/Container'

export default function Index() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        apiAuth.user()
            .then(({ data }) => {
                setUser(data)
            })
            .catch(err => {
                if (err) console.log(err)
                setUser(null)
            })
    }, [])

    const onPressCardUser = () => {
        if (!user?.pk) {
            router.push('/(options)/(auth)/sign-in')
        } else {
            router.push('/(options)/profile')
        }
    }

    const logout = () => {
        apiAuth.logout()
            .then(() => {
                setUser(null)
                storageAuth.logout()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container customStyle={{ padding: 0 }}>
            <View style={[styles.headerContainer, viweStyle.backBlur]}>
                <Text style={{ fontSize: 17, fontWeight: '400' }}>Mais Opções</Text>
            </View>

            <View style={{ height: 100 }}>
                <TouchableOpacity style={styles.inputContainer} onPress={onPressCardUser}>
                    <View style={{ flex: 1 }}>
                        {user?.image ? (
                            <Image source={{ uri: user?.image }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                        ) : (
                            <Ionicons name="person-circle" size={70} />
                        )}
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            Olá, {user?.pk ? `${user?.first_name || 'USER'} ${user?.last_name || ''}` : 'Visitante'}!
                        </Text>
                        <Text>{user?.pk ? 'Editar seu perfil.' : 'Faça login para acessar seu perfil.'}</Text>
                    </View>
                    <View>
                        <Ionicons name="chevron-forward-outline" size={30} />
                    </View>
                </TouchableOpacity>
            </View>
            {
                user?.pk && (
                    <>
                        <TouchableOpacity style={styles.cardOption} onPress={() => router.push('/(options)/orders')}>
                            <View style={{ width: '10%' }}>
                                <Ionicons name="cube-outline" size={30} />
                            </View>
                            <View style={{ width: '70%' }}>
                                <Text style={{ fontSize: 20, fontWeight: '400' }}>Pedidos</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )
            }
            

            <View style={{ height: '60%', flexDirection: 'column-reverse', padding: 10 }}>
                {user?.pk && (
                    <Button label="SAIR" onPress={logout} activeOpacity={0.7} type="danger" />
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.4,
        borderColor: colors.neutral[200],
        marginTop: 10,
        paddingLeft: 10,
    },
    headerContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomWidth: 0.2,
        borderColor: colors.neutral[400],
        backgroundColor: '#fff',
    },
    cardOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: colors.neutral[200],
        padding: 10,
    },
})
