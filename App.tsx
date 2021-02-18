import {ThemeProvider, useTheme} from '@shopify/restyle';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View,} from 'react-native';

import {Colors, Header,} from 'react-native/Libraries/NewAppScreen';
import SolidButton from "./src/components/SolidButton";
import {defaultTheme, Theme} from './src/theme';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

const AppContent: React.FC = ()=> {
  const theme = useTheme<Theme>();
  return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
            <Header/>
            <View>
              <SolidButton color="buttonPrimaryColor" onColor="onPrimary" label="Teste"/>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
  )
}

const App: React.FC = () => (
    <ThemeProvider theme={defaultTheme}>
      <AppContent />
    </ThemeProvider>
);


export default App;
