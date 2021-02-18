interface MakeApiParams {
  apiKey:string;
  baseUrl:string
};

const api = ({apiKey, baseUrl}: MakeApiParams)=>{

  return {

  }
}

type PickABookApi = ReturnType<typeof api>;
export default api;