import { createStackNavigator } from "@react-navigation/stack";
import SearchModelFormScreen from "../screens/SearchModelFormScreen";
import ModelDisplayScreen from "../screens/ModelDisplayScreen";

const Stack = createStackNavigator();

const SearchModelStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SearchForm"
            screenOptions={{ headerShown: false, presentation: "card" }}
        >
            <Stack.Screen name="SearchForm" component={SearchModelFormScreen} />
            <Stack.Screen name="ModelScreen" component={ModelDisplayScreen} />
        </Stack.Navigator>
    );
};

export default SearchModelStack;
