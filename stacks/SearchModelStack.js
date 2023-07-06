import { createStackNavigator } from "@react-navigation/stack";
import SearchModelFormScreen from "../screens/SearchModelFormScreen";
import ModelDisplayScreen from "../screens/ModelDisplayScreen";
import ModelListScreen from "../screens/ModelListScreen";

const Stack = createStackNavigator();

const SearchModelStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SearchForm"
            screenOptions={{ headerShown: false, presentation: "card" }}
        >
            <Stack.Screen name="SearchForm" component={SearchModelFormScreen} />
            <Stack.Screen name="ModelList" component={ModelListScreen} />
            <Stack.Screen name="ModelDisplay" component={ModelDisplayScreen} />
        </Stack.Navigator>
    );
};

export default SearchModelStack;
