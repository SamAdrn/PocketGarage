import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../GlobalStyles";
import OptionBox from "../components/OptionBox";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.gridContainer}>
                <OptionBox
                    title="Search Specific Models"
                    onPress={() => navigation.navigate("SearchModelStack")}
                />
                <OptionBox
                    title="About"
                    onPress={() => navigation.navigate("AboutScreen")}
                />
            </View>
        </View>
    );
};

export default HomeScreen;
