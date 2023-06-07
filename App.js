import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import SearchModelStack from "./stacks/SearchModelStack";

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen
                    name="SearchModelStack"
                    component={SearchModelStack}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
