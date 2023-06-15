import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Federated } from '@callstack/repack/client';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line import/no-extraneous-dependencies
const App1 = React.lazy(() => Federated.importModule('techhub', './Root'));

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen(props) {
  console.log('props', props);
  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <App1 {...props} Stack={Stack} />
    </React.Suspense>
  );
}

function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        {/* </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
