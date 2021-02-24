import React from 'react';
import { BoxProps } from '@shopify/restyle';
import { useQuery } from 'react-query';
import { Text } from 'react-native';
import { Theme } from '../theme';
import SliderSelect, { SliderSelectProps } from '../components/SliderSelect';
import useConfig from '../hooks/useConfig';
import useApi, { BooksListName } from '../hooks/useApi';

interface ChooseListProps extends Partial<Omit<SliderSelectProps, 'data'|'isLoading'|'onChange'|'keyExtractor'|'renderItem'>>{
  onChange?:(item:BooksListName)=>void;
}

const ChooseList: React.FC<ChooseListProps> = ({ onChange, ...rest }) => {
  const config = useConfig();
  const api = useApi(config);
  const { isLoading, error, data } = useQuery<BooksListName[], Error>('getListNames', api.getListNames);

  if (error) {
    return <Text>Something went terribly wrong... sorry </Text>;
  }
  return (
    <SliderSelect
      {...rest}
      data={data}
      isLoading={isLoading}
      onChange={onChange}
      keyExtractor={(item) => Math.random().toString(36) + item.key || item.list_name_encoded}
    />
  );
};

export default ChooseList;
