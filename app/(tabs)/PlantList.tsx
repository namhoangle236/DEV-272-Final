import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TextInput, View } from 'react-native';

import { useNavigation } from '@react-navigation/native'; // To navigate to a specific Plant detail screen

import { PlantContext } from '@/context/PlantContext'; // import the PlantContext to access the Plant info



// ======================================== Main function component ==========================================

export default function PlantSearch() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const { PlantInfo } = useContext(PlantContext);               // use the context to access the Plant info



  // Search function
  const handleSearch = (text: string) => {
    setSearch(text);                                            // Update the search state with the current input text      
    const result = PlantInfo.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())      // Filter the PlantInfo array to find items whose name includes the search text (case-insensitive)
    );
    setFilteredData(result);                                    // Update the filteredData state with the search results
  };


  useEffect(() => {
    setFilteredData(
    PlantInfo.map((item, idx) => ({
      // if item.id exists use that, otherwise fall back to index
      id: item.id != null 
        ? item.id.toString() 
        : idx.toString(),
      ...item
    }))
  )
  }, [PlantInfo]);                                              // when the component mounts, or if there's changes in PlantInfo, 
                                                                // this will update the filteredData to show all Plant
  
  
  // (TODO)
  // Navigation function when clicking on a Plant entry
  const handleNavigateToDetail = (item) => {
    console.log(item);                                          // bug check
    // navigation.navigate('PlantDetail', { item });              // Navigate to the detail screen and pass along the item
  };

  return (
    <ScrollView>
        <View style={{ flex: 1, padding: 20, backgroundColor: '#333' }}>
            {/* Search bar */}
            <TextInput
            placeholder="Search your saved plants..."
            value={search}
            onChangeText={handleSearch}
            style={{
                borderWidth: 1,
                borderColor: 'white',
                color: 'white',
                padding: 8,
                marginBottom: 10 }}
            />

            {/* FlatList to display the filtered user-entered data */}
            <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text
                style={{ padding: 10, fontSize: 18, color: 'white' }}
                onPress={() => handleNavigateToDetail(item)}          // Navigate when tapped, passing the item to GundamDetail
                >
                {item.name}
                </Text>
            )}
        />
      </View>

    </ScrollView>
  );
}


// Note:
// 'search' state variable is used to store the search input, continuously updated via onChangeText={setSearch} as the user types
// DO NOT DO THIS when calling API, plant api only allow 100 request a day per api key!
//
//
// 'handleSearch' is called as the user types in the TextInput, updating the 'search' state variable
// For each item in 'PlantInfo', compare the 'text' input with the 'name' property in PlanInfo using 'include' method, filter it, then assigned to 'result' variable
// 'filteredData' is updated with 'result', to be displayed later in the flatlist
//
//
//
//
// Study notes:
// FlatList has some key props (data, keyExtractor, renderItem)
// 'item' in keyExtractor is the object in the data array. Ex: { id: '1', name: 'Exia' }
//
// HOWEVER! 'item' in renderItem is the object in another array created behind the scene by FlatList using the objects in the 'data' array !!! Weird AF
// <FlatList> internally takes each item from data and wraps it in an object
//
// Like this: 
// {
//   item: { id: '1', name: 'Exia' },
//   index: 0,
//   separators: { ... }
// }
//
// Hence, why it looks like this:
// renderItem={({ item }) => (                ie: for each object in the array, take the 'item' property of the object, and do stuff
//
// and NOT:
//
// renderItem={(item) => (                    ie: for each object in the array, take the object itself, and do stuff