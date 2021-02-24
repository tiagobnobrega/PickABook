import React, { useCallback, useRef } from 'react';
import {
  Animated, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListBox, { ListBoxProps } from './ListBox';

export interface PageSliderPageMakerProps {
  index:number; prev:()=>void; next:()=>void;
}
export type PageSliderPageMaker = React.Component<PageSliderPageMakerProps>| React.FC<PageSliderPageMakerProps>;
export interface PageSliderProps extends Partial<Omit<ListBoxProps, 'renderItem'>>{
  scrollRef?:React.MutableRefObject<Animated.Value>;
  data: PageSliderPageMaker[];
  itemHeight?:number;
}

const PageSliderVertical:React.FC<PageSliderProps> = (props) => {
  const { height } = useWindowDimensions();
  const defaultScrollRef = useRef(new Animated.Value(0));
  const {
    scrollRef = defaultScrollRef, itemHeight = height, data, ...rest
  } = props;
  const listRef = useRef<FlatList<any>|null>(null);
  const scrollY = scrollRef.current;

  const indexRef = useRef(0);
  const handleMomentumScrollEnd = useCallback((event:NativeSyntheticEvent<NativeScrollEvent>):void => {
    const { nativeEvent: { contentOffset } } = event;
    indexRef.current = Math.round(contentOffset.y / itemHeight);
  }, [itemHeight]);

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
      snapToInterval={itemHeight}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      scrollEventThrottle={16}
      keyExtractor={(item, index) => item.key || Math.random().toString(36) + index}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default PageSliderVertical;
