import React, { useRef } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import {
  Animated, ScrollView, StyleProp, useWindowDimensions, View, ViewStyle,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import pickABookConfig, { PickABookConfig } from '../config/config';
import { ConfigContext } from '../hooks/useConfig';
import { Theme } from '../theme';
import SolidButton from '../components/SolidButton';
import Text from '../components/Text';
import { BooksListName } from '../hooks/useApi';
import PageSlider, { PageSliderPageMaker, PageSliderPageMakerProps } from '../components/PageSlider';
import Box from '../components/Box';
import Steps from '../components/Steps';
import Page from './Page';
import ChooseList from './ChooseList';

const queryClient = new QueryClient();
const pageMakerSample:PageSliderPageMaker = ({ index, prev, next }) => {
  const { width } = useWindowDimensions();
  return (
    <Box width={width} flex={1} bg="primary">
      <Text>
        Current Index is:
        {index}
      </Text>
      <SolidButton label="prev" onPress={prev} />
      <SolidButton label="next" onPress={next} />
    </Box>
  );
};

export interface PickABookProps {
  config: Partial<PickABookConfig>;
  theme: Theme;
  style?: StyleProp<ViewStyle>
}
const PickABook : React.FC<PickABookProps> = ({ config, theme, style }) => {
  const handleChange = React.useCallback((item:BooksListName) => {
    console.log('Selected Item:', { item });
  }, []);
  const { width, height } = useWindowDimensions();
  const pages = [(props:PageSliderPageMakerProps) => (
    // <Page {...props} width={width}>
    //   <Text variant="heading">Lorem Ipsum ?</Text>
      <Box width={width}>
        <ChooseList onChange={handleChange} style={{ backgroundColor: '#00f' }} nestedScrollEnabled />
       </Box>
    // </Page>
  ), pageMakerSample, pageMakerSample];
  const scrollXRef = useRef(new Animated.Value(0));
  // useEffect(()=>{
  //   const listId = scrollXRef.current.addListener(({value})=>console.log(`Steps::progressAnimatedValue=${value}`))
  //   return ()=>{
  //     scrollXRef.current.removeListener(listId);
  //   }
  // },[scrollXRef])
  return (
    <ThemeProvider theme={theme}>
      <ConfigContext.Provider value={{ ...pickABookConfig, ...config }}>
        <QueryClientProvider client={queryClient}>
          <ScrollView
              nestedScrollEnabled
            contentInsetAdjustmentBehavior="automatic"
            style={style}
          >
            <View style={{backgroundColor: "#ccc"}}>
              <Steps progressAnimatedValueRef={scrollXRef} progressMaximum={pages.length * width} />
              <PageSlider scrollXRef={scrollXRef} width={width} data={pages} nestedScrollEnabled flex={1} />
              {/*<ChooseList onChange={handleChange} />*/}
              {/* <SolidButton color="buttonPrimaryColor" onColor="onPrimary" label="Teste" width={100} ml="m" icon={<Text>{'>'}</Text>} /> */}
            </View>
          </ScrollView>
        </QueryClientProvider>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};

export default PickABook;
