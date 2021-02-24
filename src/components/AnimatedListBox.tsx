import { Animated, FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  createRestyleComponent, layout, LayoutProps, spacingShorthand, SpacingShorthandProps,
} from '@shopify/restyle';
import { Theme } from '../theme';

export type AnimatedListBoxProps = SpacingShorthandProps<Theme> & LayoutProps<Theme> & Animated.AnimatedProps<FlatListProps<any>>;
const AnimatedListBox = createRestyleComponent<AnimatedListBoxProps, Theme>([
  spacingShorthand,
  layout,
], Animated.createAnimatedComponent(FlatList));

export default AnimatedListBox;
