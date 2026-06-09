import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DriveScreen from '../screens/DriveScreen';
import MapScreen from '../screens/MapScreen';
import ParentScreen from '../screens/ParentScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ShopScreen from '../screens/ShopScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Drive" component={DriveScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Parent" component={ParentScreen} />
    </Stack.Navigator>
  );
}
