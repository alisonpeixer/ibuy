import React, { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import {  router, useSegments } from "expo-router";



interface Props {
  children: React.ReactNode;

}

export function AuthProvider({children}: Props) {
  const segments = useSegments();
  

  useEffect(()=>{
    if(segments.length > 0 && segments[2] && ['sign-in','sign-up'].includes(segments[2])){
      SecureStore.getItem('auth') && router.push('/(options)');
    }
  },[segments])

  return (
    <>{children}</>
  )
}