import fetch from 'node-fetch';

interface UseApiParams {
  apiKey:string;
  baseUrl:string
}

export interface BooksListName {
  list_name: string,
  display_name: string,
  list_name_encoded: string,
}

interface UseApiActions {
  getListNames():Promise<BooksListName[]>;
}

const getResults = async <R>(res:any):Promise<R> =>{
      const data = await res.json().catch(()=> res.text);
    if (!res.ok) {
      const errMsg =  data?.fault?.faultstring || data || 'Unexpected error occurred.'
      throw new Error(errMsg);
    }
      return data.results as R;
}
const useApi = ({apiKey, baseUrl}: UseApiParams):UseApiActions=>{
  const headers= {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    };
  const qs = `api-key=${apiKey}`
  return ({
  async getListNames(): Promise<BooksListName[]>{
    return fetch(  `${baseUrl}/lists/names.json?${qs}`, {headers})
        .then(res=>getResults<BooksListName[]>(res))
  }
  })
}

export default useApi;