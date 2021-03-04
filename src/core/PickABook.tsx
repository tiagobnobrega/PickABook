import React, {useCallback, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import {
  Animated, StyleProp, TextStyle, View, ViewStyle,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import pickABookConfig, { PickABookConfig } from '../config/config';
import { ConfigContext } from '../hooks/useConfig';
import { Theme } from '../theme';
import Text from '../components/Text';
import { BooksListName } from '../hooks/useApi';
import PageSlider, { PageSliderPageMakerProps } from '../components/PageSlider';
// import PageSliderHorizontal, { PageSliderPageMaker, PageSliderPageMakerProps } from '../components/PageSliderHorizontal';
import Box from '../components/Box';
import Steps from '../components/Steps';
import Page from './Page';
import ChooseList from './ChooseList';
import ChooseAuthor from './ChooseAuthor';
import QuestionPage from '../components/QuestionPage';

const queryClient = new QueryClient();
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
  const [list, setList] = useState<BooksListName|undefined>();
  const [author, setAuthor] = useState<{ author:string }|undefined>();

  const [componentDim, setComponentDim] = useState({ height: height || 1, width: width || 1 });
  const [stepsDim, setStepsDim] = useState({ height: height || 1, width: width || 1 });
  const itemSize = Math.max(componentDim.height - stepsDim.height, 0);
  // console.log('===PICK A BOOK===');
  // console.log('PickABook::', { val:list?.list_name_encoded });
  const pageComponents = useMemo(()=>{
    console.log('pageComponents calc!!!');
    return [
    <QuestionPage question="Lorem Ipsum ? ">
      <Box width={width}>
        <ChooseList onChange={setList} nestedScrollEnabled />
      </Box>
    </QuestionPage>,
    <QuestionPage question="Lorem Ipsum ? ">
      <Box width={width}>
        {/* <ChooseAuthor listName={list?.list_name_encoded} onChange={setAuthor} nestedScrollEnabled /> */}
      </Box>
    </QuestionPage>,
    <Box width={width}>
      <Text>{`state:${JSON.stringify({ foo: 'bar' })}`}</Text>
    </Box>,
  ]},[componentDim]);

  const pages = useMemo(() => pageComponents.map((component, index) => (props:PageSliderPageMakerProps) => {
    const pageProgressSize = (pages.length * itemSize) / 3;// <- pages.length
    const inputRange = [pageProgressSize * (index - 1), pageProgressSize * index, pageProgressSize * (index + 1)];
    const outputRange = [0, 1, 0];
    const opacity = props.scrollRef?.current.interpolate({ inputRange, outputRange, extrapolate: 'clamp' });
    return (
    // eslint-disable-next-line react/no-array-index-key
      <Page key={`page-${index}`} {...props} width={width} height={itemSize} style={{ opacity }}>
        {component}
      </Page>
    );
  }), [pageComponents]);
  const scrollRef = useRef(new Animated.Value(0));
  return (
    <ThemeProvider theme={theme}>
      <ConfigContext.Provider value={{ ...pickABookConfig, ...config }}>
        <QueryClientProvider client={queryClient}>
          <View
            style={style}
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
            {/*<QuestionPage question="Lorem Ipsum ? ">
              <Box width={width}>
                <ChooseList onChange={memoSetList} nestedScrollEnabled />
              </Box>
              <Box>
                <Text>{list?.list_name_encoded}</Text>
              </Box>
            </QuestionPage>*/}
            <PageSlider
              nestedScrollEnabled
              scrollRef={scrollRef}
              itemSize={itemSize}
              width={width}
              data={pages}
              flex={1}
            />
          </View>
        </QueryClientProvider>
      </ConfigContext.Provider>
    </ThemeProvider>
  );
};

export default PickABook;
