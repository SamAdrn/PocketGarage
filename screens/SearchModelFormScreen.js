import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Alert,
} from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";
import FirebaseManager from "../managers/FirebaseManager";

const SearchModelFormScreen = ({ navigation }) => {
    const onSubmit = () => {
        console.log("====================================");
        console.log({
            Make: selectedMake,
            Model: selectedModel,
        });
        console.log("====================================");
    };

    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const errorAlert = (e) =>
        Alert.alert(
            "Oops!",
            "An error has occurred. Please try again later.\n" + e,
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]
        );

    useEffect(() => {
        const getMakes = async () => {
            try {
                const data = await FirebaseManager.fetchMakes();
                setMakeData(data);
            } catch (e) {
                errorAlert(e);
            }
        };
        getMakes();
    }, []);

    const getModels = async () => {
        try {
            const data = await CarQueryApi.fetchModels(selectedMake);
            setModelData(data);
        } catch (e) {
            errorAlert(e);
        }
    };

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.formContainer}>
                {makeData && makeData.length == 0 ? (
                    <View></View>
                ) : (
                    <SelectList
                        data={makeData}
                        save="value"
                        setSelected={setSelectedMake}
                        placeholder="Make"
                        searchPlaceholder="Type here to search"
                        notFoundText="No Results"
                        onSelect={getModels}
                    />
                )}
                {modelData && modelData.length == 0 ? (
                    <View></View>
                ) : (
                    <SelectList
                        data={modelData}
                        save="value"
                        setSelected={setSelectedModel}
                        placeholder="Model"
                        searchPlaceholder="Type here to search"
                        notFoundText="No Results"
                    />
                )}
                <MainButton title="Search" onPress={onSubmit} />
            </View>
        </ScrollView>
    );
};

export default SearchModelFormScreen;

const styles = StyleSheet.create({
    formContainer: {
        gap: 20,
    },
});
