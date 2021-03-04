import React from 'react';
import { BoxProps, useTheme } from '@shopify/restyle';
import Box from '../components/Box';
import { PageSliderPageMakerProps } from '../components/PageSlider';
import { Theme } from '../theme';
import SolidButton from '../components/SolidButton';
import AnimatedBox, { AnimatedBoxProps } from '../components/AnimatedBox';

type PageProps = Pick<PageSliderPageMakerProps, 'prev'|'next'> & AnimatedBoxProps;
const Page: React.FC<PageProps> = ({
  children, prev, next, ...rest
}) => {
  const theme = useTheme<Theme>();
  return (
    <AnimatedBox {...rest}>
      <Box flex={1} width="100%" justifyContent="center">
        {children}
      </Box>
      <Box flexDirection="row" style={theme.actionBar}>
        <SolidButton flex={1} m="s" label="prev" onPress={prev} />
        <SolidButton flex={1} m="s" label="next" onPress={next} />
      </Box>
    </AnimatedBox>
  );
};

export default Page;
