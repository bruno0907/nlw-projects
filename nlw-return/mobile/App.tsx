import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Widget } from './src/components/Widgets';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

import { theme } from './src/assets/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>      
      <StatusBar 
        backgroundColor='transparent'
        style="inverted" 
      />
      <Widget />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,    
  },
});
