import { ButtonMenuProp } from "@/types/buttonMenu";
import { Href } from "expo-router";

export const appItensMenu = [
  {
    icon: "home-outline",
    label: "Home",
    routerPath: "/(store)",
    viweAuth: false
  },
  {
    icon: "search",
    label: "Pesquisar",
    routerPath: "/(search)",
    viweAuth: false
  },
  {
    icon: "cart",
    label: "Carrinho",
    routerPath: "/(options)/cart",
    viweAuth: true
  },
  {
    icon: "ellipsis-horizontal-outline",
    label: "Opções",
    routerPath: "/(options)",
    viweAuth: false
  }
] as ButtonMenuProp[];


export const appHidenMenuScreen = [
  "/(options)/(auth)/sign-in",
  "/(options)/(auth)/sign-up"
] as Href[];