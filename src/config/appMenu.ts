import { ButtonMenuProp } from "@/types/buttonMenu";
import { Href } from "expo-router";

export const appItensMenu = [
  {
    icon: "home-outline",
    label: "Home",
    routerPath: "/(app)"
  },
  {
    icon: "search",
    label: "Pesquisar",
    routerPath: "/(search)",
  },
  {
    icon: "ellipsis-horizontal-outline",
    label: "Opções",
    routerPath: "/(options)"
  }
] as ButtonMenuProp[];


export const appHidenMenuScreen = [
  "/(options)/(auth)/sign-in",
  "/(options)/(auth)/sign-up"
] as Href[];