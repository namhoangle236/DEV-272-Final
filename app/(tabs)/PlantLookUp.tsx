import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function PlantLookUp() {
  const [search, setSearch] = useState('');
  const [queryText, setQueryText] = useState('');

  const handleSearch = () => {
    setQueryText(search);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['plantSearch', queryText],
    queryFn: async () => {
      const res = await fetch(`https://perenual.com/api/v2/species-list?key=sk-t4cV6844c49e19f4310898&q=${encodeURIComponent(queryText)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log('Fetched:', data);
      return data;
    },
    // Only fetch when queryText is not empty, prevent fetching API on load
    enabled: !!queryText,
  });

// Note: Early return bug!
// DO NOT PUT THESE HERE! if fetch is loading or error, it will wait, and not render the search bar or anything after
//
//   if (isLoading) return <Text style={styles.message}>Loading...</Text>;
//   if (error) return <Text style={styles.error}>Error fetching data</Text>;
    
    return (
    // <ScrollView>
        <View style={styles.container}>
        <TextInput
            placeholder="Search plants..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />

        {isLoading && <Text style={styles.message}>Loading...</Text>}
        {error && <Text style={styles.error}>Error fetching data</Text>}

        <FlatList
            data={data?.data || []}                         //  Note: API response wraps the actual list of plants inside the "data" key, so we must access it like this
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (                     // get the value of the 'item' key for each entry in the object created by the flat list, which is the plant object containing all data about the plant
            <View style={styles.item}>
                <Image
                    source={{ uri: item.default_image?.thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={styles.container}>
                    <Text style={styles.name}>{item.common_name}</Text>
                </View>
                </View>
            )}
        />
        </View>
    //{/* </ScrollView> */}
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    color: 'white',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  item: {
    color: '#fff',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#555',
    padding: 5,
  },
  name: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
thumbnail: {
  width: 50,
  height: 50,
  borderRadius: 5,
  marginRight: 10,
},
});


// Note:
//
// As user types -> setSearch(text) updates the search state.
//
// User clicks the button -> call handleSearch()
//
// handleSearch() uses 'search' state's value to set 'queryText' state.
//
// Because queryText changes, TanStack Query detects it and triggers queryFn() with the new queryText as a dependency (via queryKey).
//
// The queryFn() fetches data from the API using queryText