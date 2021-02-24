import React, { useEffect, useMemo, useState } from 'react';
import {Animated, RegisteredStyle, ViewProps, ViewStyle} from 'react-native';
import { BoxProps, useTheme } from '@shopify/restyle';
import Box from './Box';
import { Theme } from '../theme';
import AnimatedBox, { AnimatedBoxProps } from './AnimatedBox';
import AnimatedText from './AnimatedText';

export interface StepsProps extends Partial<Omit<BoxProps<Theme>, 'color'>>, ViewProps{
  progressMaximum: number;
  progressAnimatedValueRef: React.MutableRefObject<Animated.Value>;
  activeColor?: string;
  onActiveColor?: string;
  color?: string;
  onColor?: string;
  stepBoxProps?: AnimatedBoxProps;
}

const Steps: React.FC<StepsProps> = (props) => {
  const { steps: stepsTheme } = useTheme<Theme>();
  const {
    progressMaximum,
    progressAnimatedValueRef,
    activeColor = stepsTheme.active.backgroundColor,
    onActiveColor = stepsTheme.active.onBackgroundColor,
    color = stepsTheme.backgroundColor,
    onColor = stepsTheme.onBackgroundColor,
    stepBoxProps,
    ...rest
  } = props;
  const stepsLabels = useMemo(() => ['1', '2', '3'], []);
  const stepProgressSize = progressMaximum / stepsLabels.length;
  const progressBarWidth = progressAnimatedValueRef.current.interpolate({
    inputRange: [0, progressMaximum],
    outputRange: ['0%', '150%'],
    extrapolate: 'clamp',
  });
  return (
    <Box flexDirection="row" justifyContent="space-between" {...rest}>
      <Box position="absolute" width="100%" style={[stepsTheme.progress as unknown as RegisteredStyle<ViewStyle>]}>
        <AnimatedBox style={[stepsTheme.progress.bar, { width: progressBarWidth }]} />
      </Box>
      {stepsLabels.map((label, index) => {
        const inputRange = [stepProgressSize * (index - 1), stepProgressSize * index];
        const bgColor = progressAnimatedValueRef.current.interpolate({
          inputRange,
          outputRange: [color, activeColor],
          extrapolate: 'clamp',
        });
        const onBgColor = progressAnimatedValueRef.current.interpolate({
          inputRange,
          outputRange: [onColor, onActiveColor],
          extrapolate: 'clamp',
        });
        return (
          <AnimatedBox
            key={`step-${label}`}
            {...stepBoxProps}
            style={[stepsTheme as unknown as RegisteredStyle<ViewStyle>, { backgroundColor: bgColor }]}
          >
            <AnimatedText style={[{ color: onBgColor }]}>{label}</AnimatedText>
          </AnimatedBox>
        );
      })}
    </Box>
  );
};
export default Steps;
