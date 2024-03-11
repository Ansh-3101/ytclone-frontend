import React from 'react'
import { useState, useEffect } from 'react';
import SearchItem from '../../components/SearchItem';
import { useRouter } from 'next/router';
import { getSearchApi } from '@/services/api';

const Search = () => {
  const router = useRouter();
  const [results, setResults] = useState([]);


  useEffect(() => {
    if (router.isReady) {
      const { query } = router.query;
      async function fetchData() {

        const json = await getSearchApi(query);
        setResults(json.items);

      }
      fetchData();
    }
  }, [router.isReady, router.query]);





  return (
    results?.map(element => {
      return (
        <SearchItem object={element} key={element.id.videoId} />
      )
    })

  )
}

export default Search