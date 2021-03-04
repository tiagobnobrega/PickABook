import React from 'react';
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import PickABook from './src/core/PickABook';
import { createTheme, defaultDesignTokens, defaultTheme } from './src/theme';

LogBox.ignoreLogs(['Setting a timer']);

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
      <SafeAreaView style={{ flex: 1 }}>
        <PickABook config={{ apiKey: 'dOg5NBbZLtDlnEZ25bI93hqcMG99wi1q' }} theme={defaultTheme} style={{ flex: 1 }} />
      </SafeAreaView>
    </>
  );
};

export default App;
