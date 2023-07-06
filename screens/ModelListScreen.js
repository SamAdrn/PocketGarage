import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import ModelBox from "../components/ModelBox";
import { globalStyles } from "../GlobalStyles";
import { material, robotoWeights, iOSUIKit } from "react-native-typography";

const ModelListScreen = ({ route, navigation }) => {
    const { data, title } = route.params;

    return (
        <ScrollView style={globalStyles.container}>
            <Text style={styles.title}>{title}</Text>
            {data.map((model) => (
                <ModelBox
                    key={model.model_id}
                    model={model}
                    navigation={navigation}
                />
            ))}
            <View style={{ height: 100 }}></View>
        </ScrollView>
    );
};

export default ModelListScreen;

const styles = StyleSheet.create({
    title: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.largeTitleEmphasized,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
            },
        }),
        paddingBottom: 20,
    },
});
