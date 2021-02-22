import { useTheme } from '@shopify/restyle';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Theme } from '../theme';
import Box from './Box';
import Text from './Text';
import AnimatedBox, { AnimatedBoxProps } from './AnimatedBox';

interface CardProps extends AnimatedBoxProps{
  icon?: React.ReactElement;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
}

const Card:React.FC<CardProps> = ({
  icon, title, titleStyle, style, ...rest
}) => {
  const { card: cardTheme } = useTheme<Theme>();
  return (
    <AnimatedBox style={[cardTheme, style]} {...rest}>
      {icon && <Box flex={2} justifyContent="center" alignItems="center">{icon}</Box>}
      <Box flex={1}><Text textAlign="center" style={[titleStyle]}>{title}</Text></Box>
    </AnimatedBox>
  );
};

export default Card;
