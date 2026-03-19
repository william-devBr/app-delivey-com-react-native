import { DefaultTheme } from "@react-navigation/native";

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF', // Sets the app background to white
  },
};