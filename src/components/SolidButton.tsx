import React, {ReactElement} from 'react';
import {layout, LayoutProps, spacingShorthand, SpacingShorthandProps, useRestyle, useTheme} from "@shopify/restyle";
import {Theme} from "../theme";
import Box from './Box';
import Text from "./Text";
import TouchableBox from "./TouchableBox";

interface SolidButtonProps extends SpacingShorthandProps<Theme>, LayoutProps<Theme>{
  color: keyof Theme['colors'];
  onColor: keyof Theme['colors'];
  label?: string;
  icon?: ReactElement;
}

const SolidButton: React.FC<SolidButtonProps> = ({label, color, onColor, icon, ...rest})=>{
  const wrapperProps = useRestyle([spacingShorthand, layout], rest)
  const theme = useTheme<Theme>();
  return (<TouchableBox {...wrapperProps}>
    <Box flex={1} bg={color} flexDirection="row" justifyContent="center" alignItems="center" {...theme.button as Partial<Theme>}>
      {label && <Box flex={1}><Text textAlign="center">{label}</Text></Box>}
      {icon && <Box>{icon}</Box>}
    </Box>
  </TouchableBox>)
}

export default SolidButton;