import React, { useEffect } from 'react';
import {
  all, BoxProps, useRestyle, useTheme,
} from '@shopify/restyle';
import {
  Animated, Easing, FlatListProps, useWindowDimensions,
} from 'react-native';
import Text from './Text';
import { Theme } from '../theme';
import Card from './Card';
import Box from './Box';
import AnimatedListBox, { AnimatedListBoxProps } from './AnimatedListBox';
import AnimatedBox from './AnimatedBox';

export interface SliderSelectProps extends Partial<BoxProps<Theme>>, Omit<AnimatedListBoxProps, 'renderItem'|'keyExtractor'>{
  onChange?:(item:any)=>void;
  isLoading?: boolean;
  data: any;
  keyExtractor: FlatListProps<any>['keyExtractor'];
  renderIcon?: (item:any)=> React.ReactElement;
}
// TODO Should make this component fully uncontrolled
const SliderSelect: React.FC<SliderSelectProps> = ({
  onChange, data, isLoading, keyExtractor, renderIcon, ...rest
}) => {
  const theme = useTheme<Theme>();
  const { width } = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = width * 0.5;
  const SPACER_WIDTH = (width - ITEM_WIDTH) / 2;
  useEffect(() => {
    if (data && onChange) {
      onChange(data[0]);
    }
  }, [data, onChange]);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) return <Text>Not found!</Text>;
  return (
    <AnimatedListBox
      {...rest}
      style={{ backgroundColor: 'rgba(0,255,255,0.5)' }}
      horizontal
      snapToInterval={ITEM_WIDTH}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      onMomentumScrollEnd={({ nativeEvent: { contentOffset } }) => {
        const selectedIndex = Math.round(contentOffset.x / ITEM_WIDTH);
        if (onChange) onChange(data[selectedIndex]);
      }}
      scrollEventThrottle={16}
      keyExtractor={keyExtractor}
      data={[{ key: 'foo-left' }, ...data.slice(0, 3), { key: 'foo-right' }]}
      renderItem={({ item, index }) => {
        if (!item.display_name) {
          return <Box width={SPACER_WIDTH} />;
        }
        const inputRange = [-2, -1, 0].map((v) => (index + v) * ITEM_WIDTH);
        const translateY = scrollX.interpolate({ inputRange, outputRange: [0, -10, 0] });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [theme.card.backgroundColor, theme.card.active.backgroundColor, theme.card.backgroundColor],
          extrapolate: 'clamp',
          easing: Easing.cubic,
        });
        return (
          <AnimatedBox
            px="s"
            width={ITEM_WIDTH}
            minHeight={200}
            style={{
              translateY, paddingTop: 15, paddingBottom: 5, backgroundColor: 'rgba(0,255,0,0.5)',
            }}
          >
            <Card title={item.display_name} style={{ backgroundColor, flex: 1 }} icon={renderIcon && renderIcon(item)} />
          </AnimatedBox>
        );
      }}
    />
  );
  // return (<FlatList data={data as BooksListName[]} renderItem={(it:BooksListName)=><Card m="s" title={it.display_name} icon={<Text>?</Text>} />} />)
};

export default SliderSelect;
