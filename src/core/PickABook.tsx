import React, { useRef, useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import {
  Animated, SafeAreaView, ScrollView, StyleProp, useWindowDimensions, View, ViewStyle,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import pickABookConfig, { PickABookConfig } from '../config/config';
import { ConfigContext } from '../hooks/useConfig';
import { Theme } from '../theme';
import SolidButton from '../components/SolidButton';
import Text from '../components/Text';
import { BooksListName } from '../hooks/useApi';
import PageSliderVertical, { PageSliderPageMaker, PageSliderPageMakerProps } from '../components/PageSliderVertical';
// import PageSliderHorizontal, { PageSliderPageMaker, PageSliderPageMakerProps } from '../components/PageSliderHorizontal';
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
  width?: number;
  height?: number;
}
const PickABook : React.FC<PickABookProps> = ({
  config, theme, style, width, height,
}) => {
  const handleChange = React.useCallback((item:BooksListName) => {
    // console.log('Selected Item:', { item });
  }, []);
  const [componentDim, setComponentDim] = useState({ height: height || 1, width: width || 1 });
  const [stepsDim, setStepsDim] = useState({ height: height || 1, width: width || 1 });
  console.log({ componentDim });
  const itemSize = Math.max(componentDim.height - stepsDim.height, 0);
  const pages = [1, 2, 3].map(() => (props:PageSliderPageMakerProps) => (
    <Page {...props} width={width} height={itemSize}>
      <Text variant="heading">Lorem Ipsum ?</Text>
      <Box width={width}>
        <ChooseList onChange={handleChange} nestedScrollEnabled />
      </Box>
    </Page>
  ));
  const scrollRef = useRef(new Animated.Value(0));
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
          {/* <ScrollView */}
          {/*  nestedScrollEnabled */}
          {/*  contentInsetAdjustmentBehavior="automatic" */}
          {/*  style={style} */}
          {/* > */}
          <View
            style={[{ backgroundColor: '#00f' }, style]}
            onLayout={(evt) => {
              const { layout } = evt.nativeEvent;
              setComponentDim({ width: layout.width, height: layout.height });
            }}
          >
            <Steps
              progressAnimatedValueRef={scrollRef}
              progressMaximum={pages.length * itemSize}
              onLayout={(evt) => {
                const { layout } = evt.nativeEvent;
                setStepsDim({ width: layout.width, height: layout.height });
              }}
            />
            <PageSliderVertical
              nestedScrollEnabled
              scrollRef={scrollRef}
              itemHeight={itemSize}
              width={width}
              data={pages}
              flex={1}
            />
            {/* <ChooseList onChange={handleChange} /> */}
            {/* <SolidButton color="buttonPrimaryColor" onColor="onPrimary" label="Teste" width={100} ml="m" icon={<Text>{'>'}</Text>} /> */}
          </View>
          {/* </ScrollView> */}
        </QueryClientProvider>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};

export default PickABook;
