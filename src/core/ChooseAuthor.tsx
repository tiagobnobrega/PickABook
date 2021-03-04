import React from 'react';
import { useQuery } from 'react-query';
import { Text } from 'react-native';
import SliderSelect, { SliderSelectProps } from '../components/SliderSelect';
import useConfig from '../hooks/useConfig';
import useApi, { BooksListName } from '../hooks/useApi';

interface ChooseListProps extends Partial<Omit<SliderSelectProps, 'data'|'isLoading'|'onChange'|'keyExtractor'|'renderItem'>>{
  onChange?:(item:{ author:string })=>void;
  listName?: string;
}

const ChooseList: React.FC<ChooseListProps> = ({ onChange, listName, ...rest }) => {
  const config = useConfig();
  const api = useApi(config);
  const { isLoading, error, data } = useQuery<string[], Error>(`getAuthors-${listName}`, async () => (listName ? api.getAuthors(listName) : []));

  if (error) {
    return <Text>Something went terribly wrong... sorry </Text>;
  }
  return (
    <SliderSelect
      {...rest}
      data={data ? data.map((d) => ({ author: d })) : []}
      labelAttr="author"
      isLoading={isLoading}
      onChange={onChange}
      keyExtractor={(item) => Math.random().toString(36) + (item.key || item.label)}
    />
  );
};

export default ChooseList;
