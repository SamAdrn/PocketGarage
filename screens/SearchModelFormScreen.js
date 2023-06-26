import { StyleSheet, View, ScrollView, Alert } from "react-native";
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
            Year: selectedYear,
            Trim: selectedTrim,
        });
        console.log("====================================");
        if (selectedYear !== "-1" && selectedTrim !== "-1") {
            const id = allTrims[selectedYear].ids[selectedTrim];
            console.log(id);
        }
    };

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
                // const data = await CarQueryApi.fetchMakes2();
                setMakeData(data);
            } catch (e) {
                errorAlert(e);
            }
        };
        getMakes();
    }, []);

    const onSelectMake = async () => {
        console.log("====================================");
        console.log("SELECT MAKE");
        console.log("====================================");
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
            setSelectedMakeID(foundMake.key)
        } catch (e) {
            errorAlert(e);
        }
    };

    const onSelectModel = async () => {
        console.log("====================================");
        console.log("SELECT MODEL");
        console.log("====================================");
        try {
            setSelectedYear("-1");
            setSelectedTrim("-1");
            setYearData([]);
            setAllTrims({});
            setTrimData([]);

            const data = await CarQueryApi.fetchTrims(
                selectedMakeID,
                selectedModel
            );

            console.log("====================================");
            console.log("ALL YEAR OPTIONS");
            console.log(data.years);
            console.log("ALL YEAR OPTIONS");
            console.log("====================================");

            setYearData(data.years);
            setAllTrims(data.trims);
            setRerenderYears((t) => !t);
            setRerenderTrims((t) => !t);
        } catch (e) {
            errorAlert(e);
        }
    };

    const onSelectYear = async () => {
        console.log("====================================");
        console.log("SELECT YEAR");
        console.log("====================================");
        setSelectedTrim("-1");
        setRerenderTrims((t) => !t);

        console.log(selectedYear);

        if (selectedYear !== "-1") {
            setTrimData(allTrims[selectedYear].options);
            console.log("====================================");
            console.log("ALL TRIM OPTIONS");
            console.log(allTrims[selectedYear].options);
            console.log("ALL TRIM OPTIONS");
            console.log("====================================");
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
