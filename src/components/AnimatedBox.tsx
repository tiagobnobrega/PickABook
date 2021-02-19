import {Animated, ViewProps} from 'react-native'
import {BoxProps, createRestyleComponent, layout, spacingShorthand,} from '@shopify/restyle';
import {Theme} from '../theme'
import * as React from "react";

export type AnimatedBoxProps = BoxProps<Theme> & Animated.AnimatedProps<ViewProps> & {children?: React.ReactNode}
const AnimatedBox = createRestyleComponent<AnimatedBoxProps, Theme>([
  spacingShorthand,
  layout,
], Animated.View);

export default AnimatedBox