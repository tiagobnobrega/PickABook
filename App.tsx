import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import PickABook from './src/core/PickABook';
import {createTheme, defaultDesignTokens, defaultTheme} from './src/theme';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

const App: React.FC = () => {
  const otherTheme = createTheme({...defaultDesignTokens, colors:{...defaultDesignTokens.colors, primary: '#f0f'}});
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        <PickABook config={{apiKey:'dOg5NBbZLtDlnEZ25bI93hqcMG99wi1q'}} theme={defaultTheme} style={styles.scrollView}/>
        <PickABook config={{apiKey:'dOg5NBbZLtDlnEZ25bI93hqcMG99wi1q'}} theme={otherTheme} style={styles.scrollView}/>
      </SafeAreaView>
    </>
)};


export default App;
