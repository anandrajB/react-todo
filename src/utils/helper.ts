interface CombineDataItem {
  id: any; 
  name: string; 
  users: any[];
}

type GetDataFunction<T> = (item: T) => any;

function combineData<T>(
  dataArray: T[] | undefined,
  getId: GetDataFunction<T>,
  getName: GetDataFunction<T>,
  getUsers: GetDataFunction<T>
): CombineDataItem[] {
  return dataArray?.map((item) => ({
    id: getId(item),
    name: getName(item),
    users: getUsers(item),
  })) || [];
}

export default combineData;