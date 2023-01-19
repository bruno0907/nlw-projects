import { View, Text } from "react-native";
import { BackButton } from "../components/BackButton";

export function Habit() {
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <BackButton />
      <Text className="mt-6 text-white font-extrabold text-3xl">Criar hábito</Text>
    </View>
  )
}