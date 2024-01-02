function combineData(dataArray, getId, getName, getUsers) {
  return dataArray?.map((item) => ({
    id: getId(item),
    name: getName(item),
    users: getUsers(item),
  })) || [];
}




export default combineData;