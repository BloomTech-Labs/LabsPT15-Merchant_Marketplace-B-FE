export default function useSearch(initialData, catagory, searchData) {
  if (searchData.length > 0) {
    const test = [];
    initialData.forEach(item => {
      if (item[catagory].includes(searchData)) {
        test.push(item);
      }
    });
    return test;
  } else {
    return initialData;
  }
}
