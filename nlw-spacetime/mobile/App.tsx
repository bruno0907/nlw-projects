import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar style="auto" translucent />
      <View className="flex-1 items-center justify-center bg-gray-950">
        <Text className="text-zinc-50 font-bold text-2xl">Hello World!</Text>        
      </View>
    </>
  );
}

