import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import { supabase } from './supabase';

export function UserPlantData() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['PlantData'],                    // ← unique key for the query
    queryFn: async () => {
      const { data, error } = await supabase
        .from('PlantData')                     // Change this to your actual table name      
        .select('*');
      if (error) throw error;
      console.log('fetched rows:', data);
      return data;
    },
  });

  if (isLoading) return <Text>Loading…</Text>
  if (error)     return <Text>Error: {error.message}</Text>


  return (
    <View>
      {data.map(item => (
        <Text
          key={item.id.toString()}
          style={{ padding: 10, fontSize: 18, color: 'white' }}
        >
          {item.name}
        </Text>
      ))}
    </View>
  )
}

// Notes:
// Supabase table name: PlantData or whatever Louise decided to use
// MUST CHANGE Supabase table RLS (Row level security) policy, otherwise the direct data would not be fetched!

