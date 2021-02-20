import React, {ReactElement} from 'react';
import {layout, LayoutProps, spacingShorthand, SpacingShorthandProps, useRestyle, useTheme} from "@shopify/restyle";
import {Theme} from "../theme";
import Box from './Box';
import Text from "./Text";
import TouchableBox, {TouchableBoxProps} from "./TouchableBox";
import {TouchableOpacityProps} from "react-native";

interface SolidButtonProps extends TouchableBoxProps{
  color?: keyof Theme['colors'];
  onColor?: keyof Theme['colors'];
  label?: string;
  icon?: ReactElement;
}

const SolidButton: React.FC<SolidButtonProps> = ({label, color, onColor, icon, ...rest})=>{
  const theme = useTheme<Theme>();
  return (
    <TouchableBox {...rest}>
      <Box flex={1} bg={color} flexDirection="row" justifyContent="center" alignItems="center" style={theme.button}>
        {label && <Box flex={1}><Text textAlign="center" color={onColor}>{label}</Text></Box>}
        {icon && <Box>{icon}</Box>}
      </Box>
    </TouchableBox>
)
}
SolidButton.defaultProps = {
  color: 'primary',
  onColor: 'onPrimary'
}
export default SolidButton;