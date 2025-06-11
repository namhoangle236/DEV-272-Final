import { supabase } from '@/components/supabase.js';
import React from 'react';
import { Button } from 'react-native';

export default function SavePlantButton({ plant }) {
  const handleSave = async () => {
    try {
      const { data: insertData, error } = await supabase
        .from('Plants')                     // Replace with table name after supabase Planst table is set up!! whatever its name is
        .insert([
          {
            plant_id: plant.id,
            common_name: plant.common_name,
            image_url: plant.default_image?.small_url,      // If no image is available, this will be null, which is fine, no need fallback logic
          },
        ]);

      if (error) {
        console.error('Insert error:', error);
      } else {
        console.log('Saved:', insertData);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return <Button title="Save" onPress={handleSave} />;
}
