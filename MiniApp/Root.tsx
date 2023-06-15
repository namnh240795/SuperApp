import * as React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreenX({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen Y</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('HomeY')}
      />
    </View>
  );
}

function HomeScreenY({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen A</Text>
      <Button title="Go to X" onPress={() => navigation.navigate('HomeX')} />
    </View>
  );
}

function HomeScreen(props: any) {
  const { Stack } = props;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeX" component={HomeScreenX} />
      <Stack.Screen name="HomeY" component={HomeScreenY} />
    </Stack.Navigator>
  );
}

export default HomeScreen;
