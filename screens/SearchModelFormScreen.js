import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";

const SearchModelFormScreen = ({ navigation }) => {
    const { register, handleSubmit, control } = useForm();
    const onSubmit = (data) => console.log(data);

    const [makeData, setMakeData] = useState([]);

    const errorAlert = () =>
        Alert.alert("Oops!", "An error has occurred. Please try again later.", [
            {
                text: "OK",
                onPress: () => {
                    navigation.navigate("Home");
                },
            },
        ]);

    useEffect(() => {
        const getMakes = async () => {
            try {
                const data = await CarQueryApi.fetchMakes();
                setMakeData(data);
            } catch {
                errorAlert();
            }
        };

        getMakes();
    }, []);

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
                    render={({ field: { onChange } }) => (
                        <SelectList
                            data={makeData}
                            save="value"
                            setSelected={onChange}
                            placeholder="Make"
                            searchPlaceholder="Type here to search"
                            notFoundText="No Results"
                        />
                    )}
                />
                <MainButton title="Search" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

export default SearchModelFormScreen;

const styles = StyleSheet.create({});
