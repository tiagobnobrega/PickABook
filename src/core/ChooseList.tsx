import React from 'react';
import { useQuery } from 'react-query';
import {all, BoxProps, useRestyle} from "@shopify/restyle";
import useConfig from "../hooks/useConfig";
import useApi, { BooksListName } from "../hooks/useApi";
import Text from '../components/Text';
import Box from '../components/Box';
import {Theme} from "../theme";

const ChooseList: React.FC<BoxProps<Theme>> = ({...rest})=>{
  const config = useConfig();
  const api = useApi(config);
  const boxProps = useRestyle([all], rest)
  const { isLoading, error, data } = useQuery<BooksListName[],Error>('getListNames', api.getListNames )
  if(isLoading){
    return <Text>Loading...</Text>
  }
  if (error) return <Text>{`An error has occurred: ${error.message}`}</Text>;
  
  return (
    <Box {...boxProps}>
      {!data ? <Text>Not found!</Text> : data.map(bookList=>(
        <Text>{bookList.display_name}</Text>
    ))}
    </Box>
  )
}

export default ChooseList;