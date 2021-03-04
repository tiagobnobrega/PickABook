import React, { useCallback, useRef } from 'react';
import {
  Animated, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListBox, { ListBoxProps } from './ListBox';

export interface PageSliderPageMakerProps {
  index:number; prev:()=>void; next:()=>void;scrollRef?:React.MutableRefObject<Animated.Value>;
}
export type PageSliderPageMaker = React.Component<PageSliderPageMakerProps>| React.FC<PageSliderPageMakerProps>;
export interface PageSliderProps extends Partial<Omit<ListBoxProps, 'renderItem'>>{
  scrollRef?:React.MutableRefObject<Animated.Value>;
  data: PageSliderPageMaker[];
  itemSize?:number;
  horizontal?: boolean;
  useNativeDriver?: boolean;
}

const PageSlider:React.FC<PageSliderProps> = (props) => {
  const { width, height } = useWindowDimensions();
  const defaultScrollRef = useRef(new Animated.Value(0));
  const {
    horizontal,
    useNativeDriver = false,
    scrollRef = defaultScrollRef,
    itemSize = horizontal ? width : height,
    data,
    ...rest
  } = props;

  const listRef = useRef<FlatList<any>|null>(null);
  const scrollValue = scrollRef.current;

  const indexRef = useRef(0);
  const handleMomentumScrollEnd = useCallback((event:NativeSyntheticEvent<NativeScrollEvent>):void => {
    const { nativeEvent: { contentOffset } } = event;
    indexRef.current = Math.round(contentOffset[horizontal ? 'x' : 'y'] / itemSize);
  }, [itemSize, horizontal]);

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
    return (
      <ItemComponent {...{
        index, prev, next, scrollRef,
      }}
      />
    );
  }, [prev, next]);

  return (
    <ListBox
      scrollEventThrottle={16}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...rest}
      ref={listRef}
      snapToInterval={itemSize}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { [horizontal ? 'x' : 'y']: scrollValue } } }], { useNativeDriver })}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      keyExtractor={(item, index) => {
        console.log('PageSlider keyExtractor!!!!', { item: JSON.stringify(item) });
        return item.key || index;
      }}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default PageSlider;
