import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {  router, useSegments } from "expo-router";
import { apiAuth, storageAuth } from "@/services/auth";
import { api } from "@/services/api";



interface Props {
  children: React.ReactNode;

}

export function AuthProvider({children}: Props) {
  const segments = useSegments();
  
  const validUser =  async () => {
    if(await SecureStore.getItemAsync('auth') !== null)
    await api.get('auth/custom/user/')
    .then( async ({data})=> {
      if(segments.length > 0 && (segments[2] && ['sign-in','sign-up'].includes(segments[2]))){
        SecureStore.getItem('auth') && router.push('/(options)');
      }
      
      if(SecureStore.getItem('user') === null){
        await SecureStore.setItemAsync('user',JSON.stringify(data));
      }
    })
    .catch(async (error)=>{
      console.log('ERRO NO AuthProvider',error.response.status);
      if(await SecureStore.getItemAsync('auth') !== null || error.response.status === 401){
        storageAuth.logout();
        router.push('/');
      }
    });
  }

  useEffect(()=>{
    validUser();
  },[segments])

  return (
    <>{children}</>
  )
}