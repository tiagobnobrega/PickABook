import { Platform } from 'react-native';
import { createTheme as createRestyleTheme } from '@shopify/restyle';

export const defaultDesignTokens = {
  colors: {
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
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
    xl: 32,
    xxl: 64,
    round: 9999,
  },
  fontFamily: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
  }),
  fontSizes: {
    s: 12,
    m: 16,
    l: 18,
    xl: 22,
  },
};
export type DesignTokens = typeof defaultDesignTokens;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createThemeObjectFromTokens = (designTokens: DesignTokens) => ({
  ...designTokens,
  colors: {
    ...designTokens.colors,
    buttonPrimaryColor: designTokens.colors.primary,
    buttonPrimaryOnColor: designTokens.colors.onPrimary,
    buttonSecondaryColor: designTokens.colors.primary,
    cardBg: designTokens.colors.bgSecondary,
    cardOnBg: designTokens.colors.onBgSecondary,
    stepsActiveBg: designTokens.colors.primary,
    stepsActiveOnBg: designTokens.colors.onPrimary,
    stepsInactiveBg: designTokens.colors.bgDisabled,
    stepsInactiveOnBg: designTokens.colors.onBgDisabled,
  },
  button: {
    borderRadius: designTokens.borderRadii.m,
    borderWidth: 1,
    padding: designTokens.spacing.m,
  },
  card: {
    padding: designTokens.spacing.m,
    borderRadius: designTokens.borderRadii.m,
    borderColor: designTokens.colors.bgSecondary,
    backgroundColor: designTokens.colors.bgSecondary,
    onBackgroundColor: designTokens.colors.onBgSecondary,
    active: {
      backgroundColor: designTokens.colors.primary,
      onBackgroundColor: designTokens.colors.onPrimary,
      borderColor: designTokens.colors.onPrimary,
    },
  },
  textVariants: {
    heading: {
      fontFamily: designTokens.fontFamily,
      color: 'primary',
      fontSize: designTokens.fontSizes.xl,
    },
  },
  steps: {
    borderRadius: designTokens.borderRadii.round,
    backgroundColor: designTokens.colors.bgSecondary,
    onBackgroundColor: designTokens.colors.onBgSecondary,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: designTokens.spacing.m,
    active: {
      backgroundColor: designTokens.colors.primary,
      onBackgroundColor: designTokens.colors.onPrimary,
    },
    progress: {
      paddingHorizontal: designTokens.spacing.m + 5,
      height: '100%',
      justifyContent: 'center',
      backgroundColor: designTokens.colors.bgSecondary,
      bar: {
        backgroundColor: designTokens.colors.primary,
        height: 10,
        borderRadius: designTokens.borderRadii.round,
      },
    },
  },
});

const defaultThemeObject = createThemeObjectFromTokens(defaultDesignTokens);

export const defaultTheme = createRestyleTheme(defaultThemeObject);
export type Theme = typeof defaultTheme;

export const createTheme = (designTokens: Partial<DesignTokens>):Theme => {
  const themeObject = createThemeObjectFromTokens({ ...defaultDesignTokens, ...designTokens });
  return createRestyleTheme(themeObject);
};
