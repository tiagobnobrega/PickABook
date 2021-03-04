import React from 'react';
import { TextStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Box from './Box';
import Text from './Text';

export interface QuestionPageProps {
  question: string;
}
const QuestionPage:React.FC<QuestionPageProps> = ({ question, children }) => {
  const theme = useTheme();
  return (
    <Box flex={1} justifyContent="center">
      <Box flex={0.5} justifyContent="center">
        <Text variant="heading" style={[theme.question.heading as TextStyle]}>{question}</Text>
      </Box>
      <Box flex={1}>
        {children}
      </Box>
    </Box>
  );
};
export default QuestionPage;
