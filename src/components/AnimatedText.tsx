import React from "react";
import {Animated, TextProps} from 'react-native'
import {createRestyleComponent, TextProps as RestyleTextProps, textRestyleFunctions,} from '@shopify/restyle';
import {Theme} from '../theme'

export type AnimatedTextProps = RestyleTextProps<Theme> & Animated.AnimatedProps<TextProps> & {children?: React.ReactNode}
const AnimatedText = createRestyleComponent<AnimatedTextProps, Theme>(textRestyleFunctions
, Animated.Text);

export default AnimatedText