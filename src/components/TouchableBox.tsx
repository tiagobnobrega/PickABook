import {TouchableHighlight} from 'react-native'
import {layout, LayoutProps, spacingShorthand, SpacingShorthandProps, useRestyle,} from '@shopify/restyle';
import React from "react";
import {Theme} from '../theme'

export type TouchableBoxProps = SpacingShorthandProps<Theme> & LayoutProps<Theme>
const TouchableBox: React.FC<TouchableBoxProps> = ({children, ...rest})=>{
  const props = useRestyle([spacingShorthand, layout], rest)
  return (<TouchableHighlight {...props}>{children}</TouchableHighlight>)
}

export default TouchableBox