import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";

import initializeFirebase from "../firebase/config";
import { ref, onValue, push, update, remove } from "firebase/database";

const SearchModelFormScreen = ({ navigation }) => {
    const { register, handleSubmit, control, getValues } = useForm();
    const onSubmit = (data) => console.log(data);

    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);

    const errorAlert = () =>
        Alert.alert("Oops!", "An error has occurred. Please try again later.", [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate("Home");
                },
            },
        ]);

    useEffect(async () => {
        const getMakes = async () => {
            try {
                const data = await CarQueryApi.fetchMakes();
                setMakeData(data);
            } catch {
                errorAlert();
            }
        };

        getMakes();

        /*
         * Firebase Tester Code, just to verify that it works.
         */
        const fb = await initializeFirebase();
        const { db } = fb;
        push(ref(db, "todos"), {
            done: false,
            title: "it works",
        });
    }, []);

    const getModels = async () => {
        try {
            const data = await CarQueryApi.fetchModels(getValues("Make"));
            setModelData(data);
        } catch {
            errorAlert();
        }
    };

    return (
        <ScrollView style={globalStyles.container}>
            <View
                style={{
                    gap: 20,
                }}
            >
                <Controller
                    control={control}
                    name="Make"
                    rules={{ required: true }}
                    render={({ field: { onChange } }) => (
                        <SelectList
                            data={makeData}
                            save="value"
                            setSelected={onChange}
                            placeholder="Make"
                            searchPlaceholder="Type here to search"
                            notFoundText="No Results"
                            onSelect={getModels}
                        />
                    )}
                />
                {modelData.length == 0 ? (
                    <View></View>
                ) : (
                    <Controller
                        control={control}
                        name="Model"
                        render={({ field: { onChange } }) => (
                            <SelectList
                                data={modelData}
                                save="value"
                                setSelected={onChange}
                                placeholder="Model"
                                searchPlaceholder="Type here to search"
                                notFoundText="No Results"
                            />
                        )}
                    />
                )}
                <MainButton title="Search" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SearchModelFormScreen;

const styles = StyleSheet.create({});
