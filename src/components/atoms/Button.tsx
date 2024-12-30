import React from "react";

import { colors } from "@/styles/colors";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  type?: 'primary' | 'outline' | 'disabled' | 'danger' | 'success';
  customStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  label,
  type = 'primary',
  customStyle,
  textStyle,
  disabled = false,
  loading = false,
  icon,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const styleButton = isDisabled ? styles.disabled : styles[type];
  const textColor = type === 'outline' ? colors.blue[400] : 'white';

  return (
    <TouchableOpacity
      style={[styleButton, customStyle]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[styles.btnText, { color: textColor }, textStyle]}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.blue[400],
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  outline: {
    borderColor: colors.blue[400],
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  disabled: {
    backgroundColor: colors.neutral[200],
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  danger: {
    backgroundColor: colors.red[500], // Vermelho para indicar erro
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  success: {
    backgroundColor: colors.green[500], // Verde para indicar sucesso
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    gap: 8,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: 'center',
  },
});
