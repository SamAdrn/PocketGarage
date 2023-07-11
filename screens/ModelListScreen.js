import { Text, View, ScrollView } from "react-native";
import React from "react";
import ModelBox from "../components/ModelBox";
import { globalStyles } from "../GlobalStyles";
import UtilityButton from "../components/UtilityButton";
import Spacer from "../components/Spacer";

const ModelListScreen = ({ route, navigation }) => {
    const { data, title } = route.params;

    return (
        <View style={{ ...globalStyles.container, padding: 0 }}>
            <ScrollView style={globalStyles.container}>
                <Text
                    style={{ ...globalStyles.title1, ...globalStyles.textBold }}
                >
                    {title}
                </Text>
                {data.map((model) => (
                    <ModelBox
                        key={model.model_id}
                        model={model}
                        navigation={navigation}
                    />
                ))}
                <Spacer />
            </ScrollView>
            <View style={globalStyles.stickyButtonContainer}>
                <UtilityButton
                    type={"Back"}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );
};

export default ModelListScreen;
