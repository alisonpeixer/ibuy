import { AxiosResponse } from "axios";
import { api } from "./api";


export class ProdutoService {
  
  constructor() {}

  getDados(id: string): Promise<AxiosResponse<any,any>> {
    return api.get(`api/produto/${id}`);
  }

}