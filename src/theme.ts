import { Platform } from 'react-native';
import {BorderProps, ColorProps, createTheme, LayoutProps} from '@shopify/restyle'

const defaultDesignTokens = {
  colors:{
    primary: '#30415d',
    onPrimary: '#fff',
    bg: '#ffffff',
    onBg: '#30415d',
    bgSecondary: '#a9b6ce',
    onBgSecondary: '#30415d',
    bgDisabled: '#ddd',
    onBgDisabled: '#535353',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    none: 0,
    s: 4,
    m: 8,
    l: 16,
    round: 9999,
  },
  fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Roboto'
  }),
  fontSizes: {
    s: 12,
    m: 16,
    l: 18,
    xl: 22
  }
};
export type DesignTokens = typeof defaultDesignTokens;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createThemeObjectFromTokens = <D extends DesignTokens>(designTokens: D) =>({
  ...defaultDesignTokens,
  colors:{
    ...defaultDesignTokens.colors,
    buttonPrimaryColor:defaultDesignTokens.colors.primary,
    buttonPrimaryOnColor:defaultDesignTokens.colors.onPrimary,
    buttonSecondaryColor:defaultDesignTokens.colors.primary,
  },
  button:{
    borderRadius: 's',
    borderWidth: 1,
    padding: 's'
  },
  card:{
    bg: 'bgSecondary',
    onBg: 'onBgSecondary',
    borderRadius: designTokens.borderRadii.m,
    padding: designTokens.spacing.m,
  },
  textVariants:{
    heading: {
      fontFamily: designTokens.fontFamily,
      color: designTokens.colors.primary,
      fontSize: designTokens.fontSizes.xl,
    },
  },
  steps: {
    activeColor: designTokens.colors.primary,
    onActiveColor: designTokens.colors.onPrimary,
    inactiveColor: designTokens.colors.bgDisabled,
    onInactiveColor: designTokens.colors.onBgDisabled,
    borderRadius: designTokens.borderRadii.round,
  }
})

const defaultThemeObject = createThemeObjectFromTokens<DesignTokens>(defaultDesignTokens);

export const defaultTheme = createTheme(defaultThemeObject);
export type Theme = typeof defaultTheme;