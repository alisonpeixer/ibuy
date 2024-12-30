import Ionicons from "@expo/vector-icons/Ionicons";
import { Href } from "expo-router";

export interface ButtonMenuProp   {
  routerPath: Href; 
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  viweAuth: boolean;
};