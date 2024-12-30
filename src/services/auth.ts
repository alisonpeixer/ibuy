import * as SecureStore from 'expo-secure-store';

import { api } from "./api"
import { AxiosResponse } from 'axios';



export const apiAuth = {
  login: async (body: any): Promise<AxiosResponse<any,any>>  => {
    return await api.postForm('auth/v1/login/',body);

  },
  logout: async (): Promise<AxiosResponse<any,any>> => {
    return await api.post('auth/v1/logout/');

  },
  user:(): Promise<AxiosResponse<any,any>> => {
    return new Promise( async (resolve,reject)=> {
      resolve(await api.get('auth/custom/user/'));
    });
    
  },
  validSession: (): Promise<boolean> => {
    return new Promise( async (resolve)=> {
      await api.post('auth/v1/user/')
      .then(res=> {
        resolve(true);
      })
      .catch(err=>{
        resolve(false);
      });
    })
  }
}





export const storageAuth = {
  login: async (data: any): Promise<boolean> => {
    try {
      await SecureStore.setItemAsync('auth', JSON.stringify(data['access']));
      await SecureStore.setItemAsync('refresh', JSON.stringify(data['refresh']));
      await SecureStore.setItemAsync('user', JSON.stringify(data['user']));

      return true;
    } catch (error) {
      return false;
    }
  },
  logout: async ()=> {
    await SecureStore.deleteItemAsync('auth');
    await SecureStore.deleteItemAsync('refresh');
    await SecureStore.deleteItemAsync('user');
  }
}