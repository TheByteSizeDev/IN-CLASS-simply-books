import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { globalSearch } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import SearchItem from '../../components/SearchItem';

export default function SearchComponent() {
  const [searchItems, setSearchItems] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchTerm } = router.query;

  useEffect(() => {
    globalSearch(searchTerm, user.uid).then((returnArray) => setSearchItems(returnArray));
  }, [user, searchTerm]);

  return (
    <>
      <h1>Search Results</h1>
      {searchItems.map((item) => (
        <SearchItem item={item} />
      ))}
    </>
  );
}
