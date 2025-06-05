import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Import Tanstack query provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import the plant context
import { PlantContext } from '../context/PlantContext.js';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Create new Tanstack query client
  const PlantDB = new QueryClient()

  // Create state to hold Plant info and pass it into the context provider later
  const [PlantInfo, setPlantInfo] = useState([]);
 
  // no state or hook after this point 
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  } 

  return (
    <QueryClientProvider client={PlantDB}>
      <PlantContext.Provider value={{ PlantInfo, setPlantInfo }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PlantContext.Provider>
    </QueryClientProvider>
  );
}
