import { createStackNavigator } from "@react-navigation/stack";
import SearchModelFormScreen from "../screens/SearchModelFormScreen";

const Stack = createStackNavigator();

const SearchModelStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SearchForm" component={SearchModelFormScreen} />
        </Stack.Navigator>
    );
};

export default SearchModelStack;
