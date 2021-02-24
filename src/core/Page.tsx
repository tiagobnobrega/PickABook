import React from 'react';
import { BoxProps } from '@shopify/restyle';
import Box from '../components/Box';
import { PageSliderPageMakerProps } from '../components/PageSliderVertical';
import { Theme } from '../theme';
import SolidButton from '../components/SolidButton';

type PageProps = Pick<PageSliderPageMakerProps, 'prev'|'next'> & BoxProps<Theme>;
const Page: React.FC<PageProps> = ({
  children, prev, next, ...rest
}) => (
  <Box {...rest}>
    <Box flex={1} width="100%" style={{ backgroundColor: '#f0f' }}>
      {children}
    </Box>
    <Box flexDirection="row">
      <SolidButton flex={1} m="s" label="prev" onPress={prev} />
      <SolidButton flex={1} m="s" label="next" onPress={next} />
    </Box>
  </Box>
);

export default Page;
