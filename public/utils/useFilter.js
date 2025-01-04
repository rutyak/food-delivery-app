
const useFilter = (searchText, allCards) =>{

    const filteredData = allCards?.filter((data) => {
        return data?.info?.name?.trim().toLowerCase().includes(searchText?.trim().toLowerCase());
      });

    return filteredData;
}

export default useFilter;