import React from 'react';
import {ThemeProvider} from "@shopify/restyle";
import {ScrollView, StyleProp, View, ViewStyle} from "react-native";
import { QueryClient, QueryClientProvider } from 'react-query'
import pickABookConfig, { PickABookConfig} from '../config/config';
import {ConfigContext} from '../hooks/useConfig';
import {Theme} from '../theme';
import SolidButton from "../components/SolidButton";
import Text from "../components/Text";
import ChooseList from "./ChooseList";

const queryClient = new QueryClient();

export interface PickABookProps {
  config: Partial<PickABookConfig>;
  theme: Theme;
  style?: StyleProp<ViewStyle>
}
const PickABook : React.FC<PickABookProps> = ({config, theme, style})=>(
  <ThemeProvider theme={theme}>
    <ConfigContext.Provider value={{...pickABookConfig, ...config}}>
      <QueryClientProvider client={queryClient}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={style}
        >
          <View>
            <ChooseList />
            <SolidButton color="buttonPrimaryColor" onColor="onPrimary" label="Teste" width={100} ml="m" icon={<Text>{'>'}</Text>} />
          </View>
        </ScrollView>
      </QueryClientProvider>
    </ConfigContext.Provider>
  </ThemeProvider>
  )

export default PickABook;