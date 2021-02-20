import React from 'react';
import {ThemeProvider} from "@shopify/restyle";
import {FlatList, ScrollView, StyleProp, useWindowDimensions, View, ViewStyle} from "react-native";
import { QueryClient, QueryClientProvider } from 'react-query'
import pickABookConfig, { PickABookConfig} from '../config/config';
import {ConfigContext} from '../hooks/useConfig';
import {Theme} from '../theme';
import SolidButton from "../components/SolidButton";
import Text from "../components/Text";
import ChooseList from "./ChooseList";
import { BooksListName } from '../hooks/useApi';
import PageSlider, {PageSliderPageMaker} from "../components/PageSlider";
import Box from '../components/Box';

const queryClient = new QueryClient();
const pageMakerSample:PageSliderPageMaker = ({index,prev,next})=> {
  const {width} = useWindowDimensions();
return   (
  <Box width={width}  flex={1} bg="primary">
    <Text>
      Current Index is:
      {index}
    </Text>
  <SolidButton label="prev" onPress={prev} />
  <SolidButton label="next" onPress={next} />
  </Box>
)
}

const DATA = [pageMakerSample,pageMakerSample,pageMakerSample];

export interface PickABookProps {
  config: Partial<PickABookConfig>;
  theme: Theme;
  style?: StyleProp<ViewStyle>
}
const PickABook : React.FC<PickABookProps> = ({config, theme, style})=>{
  const handleChange = React.useCallback((item:BooksListName)=>{
    console.log('Selected Item:',{item});
  },[]);
  const {width} = useWindowDimensions();
  return (
    <ThemeProvider theme={theme}>
      <ConfigContext.Provider value={{...pickABookConfig, ...config}}>
        <QueryClientProvider client={queryClient}>
          {/*<ScrollView*/}
          {/*  contentInsetAdjustmentBehavior="automatic"*/}
          {/*  style={style}*/}
          {/*>*/}
            <View>
              <PageSlider width={width} data={[pageMakerSample,pageMakerSample,pageMakerSample]} style={{backgroundColor:'#00f'}} nestedScrollEnabled />
              {/*<FlatList horizontal data={DATA} renderItem={({item, index})=>{*/}
              {/*  const ItemComponent = item;*/}
              {/*  return <ItemComponent {...{index}} />*/}
              {/*}} />*/}
               {/*<ChooseList onChange={handleChange} />*/}
              {/* <SolidButton color="buttonPrimaryColor" onColor="onPrimary" label="Teste" width={100} ml="m" icon={<Text>{'>'}</Text>} /> */}
            </View>
          {/*</ScrollView>*/}
        </QueryClientProvider>
      </ConfigContext.Provider>
    </ThemeProvider>
  )}

export default PickABook;