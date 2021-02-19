import React from 'react';
import {useQuery} from 'react-query';
import {all, BoxProps, useRestyle, useTheme} from "@shopify/restyle";
import {Animated, Easing, useWindowDimensions} from 'react-native';
import useConfig from "../hooks/useConfig";
import useApi, {BooksListName} from "../hooks/useApi";
import Text from '../components/Text';
import {Theme} from "../theme";
import Card from "../components/Card";
import Box from "../components/Box";
import AnimatedListBox from "../components/AnimatedListBox";
import AnimatedBox from "../components/AnimatedBox";

interface ChooseListProps extends BoxProps<Theme>{
  onItemChange:(item:any)=>void;
}

const ChooseList: React.FC<ChooseListProps> = ({...rest})=>{
  const config = useConfig();
  const api = useApi(config);
  const theme = useTheme<Theme>();
  const {width} = useWindowDimensions();
  const boxProps = useRestyle([all], rest)
  const { isLoading, error, data } = useQuery<BooksListName[],Error>('getListNames', api.getListNames )
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = width*0.5;
  const SPACER_WIDTH = (width - ITEM_WIDTH) / 2

  if(isLoading){
    return <Text>Loading...</Text>
  }
  if (error) return <Text>{`An error has occurred: ${error.message}`}</Text>;

  if(!data) return <Text>Not found!</Text>;
  return (
    <AnimatedListBox
      {...boxProps}
      horizontal
      snapToInterval={ITEM_WIDTH}
      decelerationRate={0}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
      onMomentumScrollEnd={({nativeEvent: {contentOffset}})=>{
        console.log('INDEX:::',Math.round(contentOffset.x/ITEM_WIDTH))
        //!!! @@@@@@@@@@@@@@@@@@@@@@@@    CALL onItemChange !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
      }}
      scrollEventThrottle={16}
      keyExtractor={(item)=>Math.random().toString(36)+item.key || item.list_name_encoded}
      data={[{key:'foo-left'},...data.slice(0,3), {key:'foo-right'}]}
      renderItem={({item, index})=> {
        if(!item.display_name){
          return <Box width={SPACER_WIDTH} />
        }
        const inputRange = [-2,-1,0].map(v=>(index+v)*ITEM_WIDTH);
        const translateY = scrollX.interpolate({inputRange, outputRange:[0,-10,0]});
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange:[theme.card.backgroundColor,theme.card.active.backgroundColor,theme.card.backgroundColor],
          extrapolate:'clamp',
          easing:Easing.cubic
        });
        return (
          <AnimatedBox px="s" width={ITEM_WIDTH} minHeight={200} style={{translateY, paddingTop:15, paddingBottom:5}}>
            <Card title={item.display_name} style={{backgroundColor, flex:1}} icon={<Text fontSize={20}>?</Text>} />
          </AnimatedBox>
)
      }}
    />
  )
  // return (<FlatList data={data as BooksListName[]} renderItem={(it:BooksListName)=><Card m="s" title={it.display_name} icon={<Text>?</Text>} />} />)
}

export default ChooseList;