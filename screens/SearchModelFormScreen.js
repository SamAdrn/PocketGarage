import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchModelFormScreen = ({ navigation }) => {
    const { register, handleSubmit, control } = useForm();
    const onSubmit = (data) => console.log(data);

    const [makeData, setMakeData] = useState([]);

    const BASE_URL = "https://www.carqueryapi.com/api/0.3/?callback=?&";

    const getMakes = async () => {
        console.log("RUN GET MAKES");
        const url = `${BASE_URL}cmd=getMakes`;

        axios
            .get(url)
            .then((response) => {
                const json = JSON.parse(
                    response.data.replace(/^.*?\(/, "").replace(/\);?$/, "")
                );
                setMakeData(
                    json["Makes"].map((make) => {
                        return {
                            key: make.make_id,
                            value: make.make_display,
                        };
                    })
                );
            })
            .catch((error) => {
                Alert.alert(
                    "Oops!",
                    "An error has occurred. Please try again later.",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate("Home");
                            },
                        },
                    ]
                );
            });
    };

    useEffect(() => {
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
