import { Platform, StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { globalStyles } from "../GlobalStyles";
import MainButton from "../components/MainButton";
import { useEffect } from "react";
import CarQueryApi from "../managers/CarQueryApiManager";
import {
    material,
    robotoWeights,
    materialColors,
    iOSUIKit,
    sanFranciscoWeights,
    iOSColors,
} from "react-native-typography";

const ModelDisplayScreen = ({ route, navigation }) => {
    const { model } = route.params;

    useEffect(() => {
        console.log("====================================");
        console.log("PARAMS ROUTE");
        console.log(model);
        console.log("====================================");
    }, []);

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {model.model_year} {model.make_display} {model.model_name}
                </Text>
                <Text style={styles.subtitle}>{model.model_trim}</Text>
            </View>

            <View style={[styles.section, { backgroundColor: "#ededed" }]}>
                <Text style={styles.sectionTitle}>Key Specifications</Text>
                <View style={globalStyles.gridContainer}>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Origin</Text>
                        <Text style={styles.info}>{model.make_country}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Make Brand</Text>
                        <Text style={styles.info}>{model.make_display}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Model</Text>
                        <Text style={styles.info}>{model.model_name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Model Year</Text>
                        <Text style={styles.info}>{model.model_year}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>
                            Body Classification
                        </Text>
                        <Text style={styles.info}>{model.model_body}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>No. of Doors</Text>
                        <Text style={styles.info}>
                            {model.model_doors} doors
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Fuel Type</Text>
                        <Text style={styles.info}>
                            {CarQueryApi.fuelType(model)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Transmission</Text>
                        <Text style={styles.info}>
                            {model.model_transmission_type || "N/A"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vehicle</Text>
                <View style={globalStyles.gridContainer}>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Drivetrain</Text>
                        <Text style={styles.info}>
                            {CarQueryApi.drivetrainType(model)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Engine Position</Text>
                        <Text style={styles.info}>
                            {model.model_engine_position}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Weight (kg)</Text>
                        <Text style={styles.info}>
                            {model.model_weight_kg || "N/A"}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Weight (lbs)</Text>
                        <Text style={styles.info}>
                            {model.model_weight_lbs || "N/A"}
                        </Text>
                    </View>
                    {model.model_length_in ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Length (in)</Text>
                            <Text style={styles.info}>
                                {model.model_length_in}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_length_mm ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Length (mm)</Text>
                            <Text style={styles.info}>
                                {model.model_length_mm}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_width_in ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Width (in)</Text>
                            <Text style={styles.info}>
                                {model.model_width_in}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_width_mm ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Width (mm)</Text>
                            <Text style={styles.info}>
                                {model.model_width_mm}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_height_in ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Height (in)</Text>
                            <Text style={styles.info}>
                                {model.model_height_in}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_height_mm ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Height (mm)</Text>
                            <Text style={styles.info}>
                                {model.model_height_mm}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_wheelbase_in ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Wheelbase (in)</Text>
                            <Text style={styles.info}>
                                {model.model_wheelbase_mm}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_wheelbase_mm ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>Wheelbase (mm)</Text>
                            <Text style={styles.info}>
                                {model.model_wheelbase_mm}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>
            </View>

            <View style={[styles.section, { backgroundColor: "#ededed" }]}>
                <Text style={styles.sectionTitle}>Engine</Text>
                <View style={globalStyles.gridContainer}>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Displacement (l)</Text>
                        <Text style={styles.info}>{model.model_engine_l}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Configuration</Text>
                        <Text style={styles.info}>
                            {CarQueryApi.engineConfiguration(model)}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Valves (per cyl)</Text>
                        <Text style={styles.info}>
                            {model.model_engine_valves} (
                            {model.model_engine_valves_per_cyl})
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Position</Text>
                        <Text style={styles.info}>
                            {model.model_engine_position}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Power (hp)</Text>
                        <Text style={styles.info}>
                            {model.model_engine_power_hp}{" "}
                            {model.model_engine_power_rpm
                                ? `\n(@ ${model.model_engine_power_rpm} RPM)`
                                : ""}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoTitle}>Torque (nm)</Text>
                        <Text style={styles.info}>
                            {model.model_engine_torque_nm}{" "}
                            {model.model_engine_torque_rpm
                                ? `\n(@ ${model.model_engine_torque_rpm} RPM)`
                                : ""}
                        </Text>
                    </View>
                    {model.model_top_speed_kph ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>
                                Top Speed (kph)
                            </Text>
                            <Text style={styles.info}>
                                {model.model_top_speed_kph}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_top_speed_mph ? (
                        <View style={styles.row}>
                            <Text style={styles.infoTitle}>
                                Top Speed (mph)
                            </Text>
                            <Text style={styles.info}>
                                {model.model_top_speed_mph}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    {model.model_engine_fuel ? (
                        <View style={{ ...styles.row, width: "100%" }}>
                            <Text style={styles.infoTitle}>Fuel</Text>
                            <Text style={styles.info}>
                                {model.model_engine_fuel}
                            </Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <MainButton
                    title={"Back"}
                    onPress={() => navigation.goBack()}
                />
            </View>
        </ScrollView>
    );
};

export default ModelDisplayScreen;

const styles = StyleSheet.create({
    header: {
        padding: 30,
    },
    section: {
        paddingTop: 10,
        paddingBottom: 30,
    },
    row: {
        width: "50%",
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    title: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.largeTitleEmphasized,
                paddingVertical: 10,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
                color: materialColors.blackPrimary,
                paddingTop: 10,
                paddingBottom: 20,
            },
        }),
    },
    subtitle: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.title3Emphasized,
                ...sanFranciscoWeights.light,
            },
            android: {
                ...material.headline,
                ...robotoWeights.light,
                color: materialColors.blackPrimary,
            },
        }),
    },
    sectionTitle: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.title3,
                ...sanFranciscoWeights.medium,
                color: iOSColors.gray,
                paddingVertical: 10,
            },
            android: {
                ...material.headline,
                ...robotoWeights.medium,
                color: materialColors.blackSecondary,
                paddingVertical: 15,
            },
        }),
        paddingHorizontal: 30,
    },
    infoTitle: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.caption2Emphasized,
                ...sanFranciscoWeights.regular,
                paddingBottom: 10,
            },
            android: {
                ...material.body1,
                paddingBottom: 5,
            },
        }),
    },
    info: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.body,
                ...sanFranciscoWeights.medium,
                color: iOSColors.black,
            },
            android: {
                ...material.title,
                ...robotoWeights.medium,
                color: materialColors.blackPrimary,
            },
        }),
    },

    buttonContainer: {
        paddingTop: 30,
        paddingHorizontal: 30,
        paddingBottom: 100,
    },
});
