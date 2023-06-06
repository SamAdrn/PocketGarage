import { View, Text } from "react-native";
import React from "react";
import { globalStyles } from "../GlobalStyles";
import OptionBox from "../components/OptionBox";

const HomeScreen = () => {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.gridContainer}>
                <OptionBox title="Search Specific Models" />
                <OptionBox title="Browse Cars"/>
                <OptionBox title="VIN Decoder"/>
            </View>
        </View>
    );
};

export default HomeScreen;
