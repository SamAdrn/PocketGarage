import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { material, robotoWeights, iOSUIKit } from "react-native-typography";
import CarQueryApi from "../managers/CarQueryApiManager";
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";

const ModelBox = ({ model, navigation }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.6 },
            ]}
            onPress={async () => {
                const mod = await CarQueryApi.fetchModelDetails(
                    model.model_id
                );
                navigation.navigate("ModelDisplay", { model: mod });
            }}
        >
            <View style={styles.detailsContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {model.model_year} {model.make_display}{" "}
                        {model.model_name}
                    </Text>
                    <Text style={styles.subtitle}>{model.model_trim}</Text>
                </View>
                <View style={styles.overview}>
                    <View style={styles.info}>
                        <FontAwesome5
                            name="gas-pump"
                            style={styles.infoContent}
                        />
                        <Text style={styles.infoContent}>
                            {CarQueryApi.fuelType(model, true)}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <MaterialCommunityIcons
                            name="engine"
                            style={styles.infoContent}
                        />
                        <Text style={styles.infoContent}>
                            {CarQueryApi.engineConfiguration(
                                model,
                                true
                            )}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="gear" style={styles.infoContent} />
                        <Text style={styles.infoContent}>
                            {CarQueryApi.transmission(model, true)}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <Fontisto name="car" style={styles.infoContent} />
                        <Text style={styles.infoContent}>
                            {CarQueryApi.drivetrainType(
                                model,
                                true,
                                true
                            )}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AntDesign name="right" style={styles.arrowIcon} />
            </View>
        </Pressable>
    );
};

export default ModelBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e5e5e5",
        padding: 10,
        borderRadius: 10,
        marginVertical: 15,
        flexDirection: "row",
    },
    detailsContainer: {
        width: "85%",
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingStart: "5%",
    },
    header: {
        paddingBottom: 15,
    },
    overview: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    title: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.title3Emphasized,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
            },
        }),
        paddingBottom: 10,
    },
    subtitle: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.subhead,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
            },
        }),
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    infoContent: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.callout,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
            },
        }),
    },
    arrowIcon: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.title3Emphasized,
                opacity: 0.7,
            },
            android: {
                ...material.display2,
                ...robotoWeights.bold,
            },
        }),
    },
});
