import { FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  createRestyleComponent, layout, LayoutProps, spacingShorthand, SpacingShorthandProps,
} from '@shopify/restyle';
import { Theme } from '../theme';

export type ListBoxProps = SpacingShorthandProps<Theme> & LayoutProps<Theme> & FlatListProps<any>;
const ListBox = createRestyleComponent<ListBoxProps, Theme>([
  spacingShorthand,
  layout,
], FlatList);

export default ListBox;
