import React, { useCallback, useRef } from 'react';
import {
  Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions,
} from 'react-native';
import ListBox, { ListBoxProps } from './ListBox';

export interface PageSliderPageMakerProps {
  index:number; prev:()=>void; next:()=>void;
}
export type PageSliderPageMaker = React.Component<PageSliderPageMakerProps>| React.FC<PageSliderPageMakerProps>;
export interface PageSliderProps extends Partial<Omit<ListBoxProps, 'renderItem'>>{
  scrollXRef?:React.MutableRefObject<Animated.Value>;
  data: PageSliderPageMaker[];
  itemWidth?:number;
}

const PageSlider:React.FC<PageSliderProps> = (props) => {
  const { width } = useWindowDimensions();
  const defaultScrollXRef = useRef(new Animated.Value(0));
  const {
    scrollXRef = defaultScrollXRef, itemWidth = width, data, ...rest
  } = props;
  const listRef = useRef<FlatList|null>(null);
  const scrollX = scrollXRef.current;

  const indexRef = useRef(0);
  const handleMomentumScrollEnd = useCallback((event:NativeSyntheticEvent<NativeScrollEvent>):void => {
    const { nativeEvent: { contentOffset } } = event;
    indexRef.current = Math.round(contentOffset.x / itemWidth);
  }, []);

  const next = ():void => {
    if (indexRef.current < data.length - 1) {
      listRef.current?.scrollToIndex({ animated: true, index: indexRef.current + 1 });
      indexRef.current += 1;
    }
  };
  const prev = ():void => {
    if (indexRef.current > 0) {
      listRef.current?.scrollToIndex({ animated: true, index: indexRef.current - 1 });
      indexRef.current -= 1;
    }
  };

  const renderItem = useCallback(({ item, index }) => {
    const ItemComponent = item;
    return <ItemComponent {...{ index, prev, next }} />;
  }, [prev, next]);

  return (
    <ListBox
      {...rest}
      ref={listRef}
      horizontal
      snapToInterval={itemWidth}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      scrollEventThrottle={16}
      keyExtractor={(item, index) => item.key || Math.random().toString(36) + index}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default PageSlider;
