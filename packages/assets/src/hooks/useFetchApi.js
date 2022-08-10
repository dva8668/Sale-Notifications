import React, {useEffect, useState} from 'react';

export default function fetchApi(url) {
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(defaultData);

  async function loadData() {
    try {
      setLoading(true);
      const response = await fetch(`https://localhost:3000/api${url}`);
      const DataList = await response.json();
      setData(DataList.data);
      setFetched(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  return {data, loading, fetched, setData};
}
