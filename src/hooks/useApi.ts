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

export interface ListHistoryBooks {
  author:string;
  title:string;
  book_image: string;
}
export interface ListHistory {
  books:ListHistoryBooks[]
}

interface UseApiActions {
  getListNames():Promise<BooksListName[]>;
  getAuthors(listName:string):Promise<string[]>
}

const getResults = async <R>(res:any):Promise<R> => {
  const data = await res.json().catch(() => res.text);
  if (!res.ok) {
    const errMsg = data?.fault?.faultstring || data || 'Unexpected error occurred.';
    throw new Error(errMsg);
  }
  return data.results as R;
};
const useApi = ({ apiKey, baseUrl }: UseApiParams):UseApiActions => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const qs = `api-key=${apiKey}`;
  return ({
    async getListNames(): Promise<BooksListName[]> {
      return fetch(`${baseUrl}/lists/names.json?${qs}`, { headers })
        .then((res) => getResults<BooksListName[]>(res));
    },
    async getAuthors(listName:string): Promise<string[]> {
      const authors: Set<string> = new Set();
      const listHistories = await fetch(`${baseUrl}/lists/current/${listName}.json?${qs}`, { headers })
        .then((res) => getResults<ListHistory>(res));
      for (const book of listHistories.books) {
        authors.add(book.author);
      }
      return [...authors];
    },
  });
};

export default useApi;
