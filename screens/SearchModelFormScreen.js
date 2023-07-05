import { StyleSheet, View, ScrollView, Alert } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";
import FirebaseManager from "../managers/FirebaseManager";

const SearchModelFormScreen = ({ navigation }) => {

    const [rerenderModels, setRerenderModels] = useState(false);
    const [rerenderYears, setRerenderYears] = useState(false);
    const [rerenderTrims, setRerenderTrims] = useState(false);

    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [trimData, setTrimData] = useState([]);

    const [allTrims, setAllTrims] = useState({});

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("-1");
    const [selectedTrim, setSelectedTrim] = useState("-1");

    const [selectedMakeID, setSelectedMakeID] = useState("");

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

    const onSelectMake = async () => {
        try {
            const foundMake = makeData.find((m) => m.value === selectedMake);

            setSelectedModel("");
            setSelectedYear("-1");
            setSelectedTrim("-1");
            setModelData([]);
            setYearData([]);
            setAllTrims({});
            setTrimData([]);

            const data = await CarQueryApi.fetchModels(foundMake.key);
            setModelData(data);

            setRerenderModels((t) => !t);
            setRerenderYears((t) => !t);
            setRerenderTrims((t) => !t);
            setSelectedMakeID(foundMake.key);
        } catch (e) {
            errorAlert(e);
        }
    };

    const onSelectModel = async () => {
        try {
            setSelectedYear("-1");
            setSelectedTrim("-1");
            setYearData([]);
            setAllTrims({});
            setTrimData([]);
            setRerenderYears((t) => !t);
            setRerenderTrims((t) => !t);

            const data = await CarQueryApi.fetchTrims(
                selectedMakeID,
                selectedModel
            );

            setYearData(data.years);
            setAllTrims(data.trims);
            setRerenderYears((t) => !t);
            setRerenderTrims((t) => !t);
        } catch (e) {
            errorAlert(e);
        }
    };

    const onSelectYear = async () => {
        setSelectedTrim("-1");
        setRerenderTrims((t) => !t);

        if (selectedYear !== "-1") {
            setTrimData(allTrims[selectedYear].options);
        }
    };

    const onSubmit = async () => {
        console.log("====================================");
        console.log({
            Make: selectedMake,
            Model: selectedModel,
            Year: selectedYear,
            Trim: selectedTrim,
        });
        console.log("====================================");
        if (selectedYear !== "-1" && selectedTrim !== "-1") {
            const id = allTrims[selectedYear].ids[selectedTrim];
            const model = await CarQueryApi.fetchModelDetails(id);
            navigation.navigate("ModelScreen", { model: model });
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
                        onSelect={onSelectMake}
                    />
                )}
                {modelData && modelData.length == 0 ? (
                    <View></View>
                ) : (
                    <SelectList
                        key={rerenderModels}
                        data={modelData}
                        save="value"
                        setSelected={setSelectedModel}
                        placeholder="Model"
                        searchPlaceholder="Type here to search"
                        notFoundText="No Results"
                        onSelect={onSelectModel}
                    />
                )}
                {yearData && yearData.length == 0 ? (
                    <View></View>
                ) : (
                    <SelectList
                        key={rerenderYears}
                        data={yearData}
                        save="value"
                        setSelected={setSelectedYear}
                        placeholder="Model Year"
                        searchPlaceholder="Type here to search"
                        notFoundText="No Results"
                        defaultOption={{ key: "-1", value: "All Years" }}
                        onSelect={onSelectYear}
                    />
                )}
                {trimData && trimData.length == 0 ? (
                    <View></View>
                ) : (
                    <SelectList
                        key={rerenderTrims}
                        data={trimData}
                        save="value"
                        setSelected={setSelectedTrim}
                        placeholder="Trim Level"
                        searchPlaceholder="Type here to search"
                        notFoundText="No Results"
                        defaultOption={{ key: "-1", value: "All Trims" }}
                    />
                )}
                <MainButton
                    title="Search"
                    onPress={onSubmit}
                    disabled={selectedMake === "" || selectedModel === ""}
                />
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
