import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import PickABook from './src/core/PickABook';
import { createTheme, defaultDesignTokens, defaultTheme } from './src/theme';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

const App: React.FC = () => {
  const otherTheme = createTheme({
    ...defaultDesignTokens,
    colors: { ...defaultDesignTokens.colors, primary: '#f0f' },
  });
  otherTheme.steps = {
    ...otherTheme.steps,
    progress: {
      paddingHorizontal: 0,
      height: '100%',
      justifyContent: 'center',
      backgroundColor: defaultDesignTokens.colors.bgSecondary,
      bar: {
        backgroundColor: defaultDesignTokens.colors.primary,
        // @ts-ignore
        height: '100%',
      },
    },
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <PickABook config={{ apiKey: 'dOg5NBbZLtDlnEZ25bI93hqcMG99wi1q' }} theme={defaultTheme} style={styles.scrollView} />
      </SafeAreaView>
    </>
  );
};

export default App;
