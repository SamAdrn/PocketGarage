import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useState, useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";
import FirebaseManager from "../managers/FirebaseManager";

const SearchModelFormScreen = ({ navigation }) => {
    const [makeData, setMakeData] = useState([]);
    const [modelData, setModelData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [trimData, setTrimData] = useState([]);

    const [allTrims, setAllTrims] = useState({});

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState("-1");
    const [selectedTrim, setSelectedTrim] = useState("-1");

    const [makeOpen, setMakeOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [trimOpen, setTrimOpen] = useState(false);

    const [makeLoading, setMakeLoading] = useState(false);
    const [modelLoading, setModelLoading] = useState(false);
    const [yearLoading, setYearLoading] = useState(false);
    const [trimLoading, setTrimLoading] = useState(false);

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
            setMakeLoading(true);
            try {
                const data = await FirebaseManager.fetchMakes();
                setMakeData(data);
            } catch (e) {
                errorAlert(e);
            }
            setMakeLoading(false);
        };
        getMakes();
    }, []);

    const onSelectMake = async (make) => {
        setModelLoading(true);
        try {
            setSelectedModel("");
            setSelectedYear("-1");
            setSelectedTrim("-1");
            setModelData([]);
            setYearData([]);
            setAllTrims({});
            setTrimData([]);

            const data = await CarQueryApi.fetchModels(make.value);
            setModelData(data);
        } catch (e) {
            errorAlert(e);
        }
        setModelLoading(false);
    };

    const onSelectModel = async (model) => {
        setYearLoading(true);
        try {
            setSelectedYear("-1");
            setSelectedTrim("-1");
            setYearData([]);
            setAllTrims({});
            setTrimData([]);

            const data = await CarQueryApi.fetchTrims(
                selectedMake,
                model.model_name
            );

            setYearData(data.years);
            setAllTrims(data.trims);
        } catch (e) {
            errorAlert(e);
        }
        setYearLoading(false);
    };

    const onSelectYear = async (year) => {
        setTrimLoading(true);
        setSelectedTrim("-1");
        setTrimData(allTrims[year.value]);
        setTrimLoading(false);
    };

    const onOpenPicker = (picker) => {
        const pickers = {
            make: setMakeOpen,
            model: setModelOpen,
            year: setYearOpen,
            trim: setTrimOpen,
        };

        Object.keys(pickers).forEach((key) => {
            const setter = pickers[key];
            setter(key === picker ? (t) => !t : false);
        });
    };

    const onSubmit = async () => {
        if (selectedTrim !== "-1") {
            const model = await CarQueryApi.fetchModelDetails(selectedTrim);
            navigation.navigate("ModelDisplay", { model: model });
        } else {
            const data = await CarQueryApi.fetchModelList(
                selectedMake,
                selectedModel,
                selectedYear
            );
            const title =
                `All ${selectedYear == "-1" ? "" : selectedYear + " "}` +
                `${selectedModel} Models`;
            navigation.navigate("ModelList", { data: data, title: title });
        }
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.formContainer}>
                {/* Make Dropdown */}
                <DropDownPicker
                    open={makeOpen}
                    value={selectedMake}
                    items={makeData}
                    setOpen={() => onOpenPicker("make")}
                    setValue={setSelectedMake}
                    loading={makeLoading}
                    placeholder="Make"
                    searchable="true"
                    searchPlaceholder="Type here to search"
                    style={styles.dropdownStyle}
                    dropDownContainerStyle={styles.dropdownStyle}
                    searchContainerStyle={styles.searchContainerStyle}
                    searchTextInputStyle={styles.searchTextInputStyle}
                    textStyle={styles.dropdownTextStyle}
                    labelStyle={styles.dropdownLabelStyle}
                    selectedItemContainerStyle={
                        styles.selectedItemContainerStyle
                    }
                    zIndex={4000}
                    zIndexInverse={1000}
                    closeAfterSelecting={true}
                    onSelectItem={onSelectMake}
                />
                {/* Model Dropdown */}
                {selectedMake == "" ? null : (
                    <DropDownPicker
                        schema={{
                            label: "model_name",
                            value: "model_name",
                        }}
                        open={modelOpen}
                        value={selectedModel}
                        items={modelData}
                        setOpen={() => onOpenPicker("model")}
                        setValue={setSelectedModel}
                        loading={modelLoading}
                        placeholder="Model"
                        searchable="true"
                        searchPlaceholder="Type here to search"
                        style={styles.dropdownStyle}
                        dropDownContainerStyle={styles.dropdownStyle}
                        searchContainerStyle={styles.searchContainerStyle}
                        searchTextInputStyle={styles.searchTextInputStyle}
                        textStyle={styles.dropdownTextStyle}
                        labelStyle={styles.dropdownLabelStyle}
                        selectedItemContainerStyle={
                            styles.selectedItemContainerStyle
                        }
                        zIndex={3000}
                        zIndexInverse={2000}
                        closeAfterSelecting={true}
                        onSelectItem={onSelectModel}
                    />
                )}
                {/* Year Dropdown */}
                {selectedModel == "" ? null : (
                    <DropDownPicker
                        schema={{
                            label: "value",
                            value: "value",
                        }}
                        open={yearOpen}
                        value={selectedYear}
                        items={yearData}
                        setOpen={() => onOpenPicker("year")}
                        setValue={setSelectedYear}
                        loading={yearLoading}
                        placeholder="All Years"
                        searchable="true"
                        searchPlaceholder="Type here to search"
                        style={styles.dropdownStyle}
                        dropDownContainerStyle={styles.dropdownStyle}
                        searchContainerStyle={styles.searchContainerStyle}
                        searchTextInputStyle={styles.searchTextInputStyle}
                        textStyle={styles.dropdownTextStyle}
                        labelStyle={styles.dropdownLabelStyle}
                        selectedItemContainerStyle={
                            styles.selectedItemContainerStyle
                        }
                        zIndex={2000}
                        zIndexInverse={3000}
                        closeAfterSelecting={true}
                        onSelectItem={onSelectYear}
                    />
                )}
                {/* Trim Dropdown */}
                {selectedYear == "-1" ? null : (
                    <DropDownPicker
                        schema={{
                            label: "value",
                            value: "key",
                        }}
                        open={trimOpen}
                        value={selectedTrim}
                        items={trimData}
                        setOpen={() => onOpenPicker("trim")}
                        setValue={setSelectedTrim}
                        loading={trimLoading}
                        placeholder="All Trims"
                        searchable="true"
                        searchPlaceholder="Type here to search"
                        style={styles.dropdownStyle}
                        dropDownContainerStyle={styles.dropdownStyle}
                        searchContainerStyle={styles.searchContainerStyle}
                        searchTextInputStyle={styles.searchTextInputStyle}
                        textStyle={styles.dropdownTextStyle}
                        labelStyle={styles.dropdownLabelStyle}
                        selectedItemContainerStyle={
                            styles.selectedItemContainerStyle
                        }
                        zIndex={1000}
                        zIndexInverse={4000}
                        closeAfterSelecting={true}
                    />
                )}
                <MainButton
                    title="Search"
                    onPress={onSubmit}
                    disabled={
                        selectedMake === "" ||
                        selectedModel === "" ||
                        selectedYear === "" ||
                        selectedTrim === ""
                    }
                />
            </View>
        </View>
    );
};

export default SearchModelFormScreen;

const styles = StyleSheet.create({
    formContainer: {},

    dropdownStyle: {
        backgroundColor: "#f8f9fa",
        borderColor: "#6c757d",
    },

    searchContainerStyle: {
        borderColor: "#6c757d",
    },

    searchTextInputStyle: {
        borderWidth: 0,
    },

    dropdownTextStyle: {
        ...globalStyles.subBody,
    },

    dropdownLabelStyle: {
        ...globalStyles.subBody,
    },

    selectedItemContainerStyle: {
        backgroundColor: "#e9ecef",
    },
});
