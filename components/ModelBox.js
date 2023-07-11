import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import CarQueryApi from "../managers/CarQueryApiManager";
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { globalStyles } from "../GlobalStyles";

const ModelBox = ({ model, navigation }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.6 },
            ]}
            onPress={async () => {
                const mod = await CarQueryApi.fetchModelDetails(model.model_id);
                navigation.navigate("ModelDisplay", { model: mod });
            }}
        >
            <View style={styles.detailsContainer}>
                <View style={styles.header}>
                    <Text
                        style={{
                            ...globalStyles.title2,
                            ...globalStyles.textBold,
                            paddingBottom: 10,
                        }}
                    >
                        {model.model_year} {model.make_display}{" "}
                        {model.model_name}
                    </Text>
                    <Text
                        style={{
                            ...globalStyles.subBody,
                            ...globalStyles.textLight,
                        }}
                    >
                        {model.model_trim == "" ? "Base" : model.model_trim}
                    </Text>
                </View>
                <View style={styles.overview}>
                    <View style={styles.info}>
                        <FontAwesome5
                            name="gas-pump"
                            style={globalStyles.body}
                        />
                        <Text style={globalStyles.body}>
                            {CarQueryApi.fuelType(model, true)}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <MaterialCommunityIcons
                            name="engine"
                            style={globalStyles.body}
                        />
                        <Text style={globalStyles.body}>
                            {CarQueryApi.engineConfiguration(model, true)}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <FontAwesome name="gear" style={globalStyles.body} />
                        <Text style={globalStyles.body}>
                            {CarQueryApi.transmission(model, true)}
                        </Text>
                    </View>
                    <View style={styles.info}>
                        <Fontisto name="car" style={globalStyles.body} />
                        <Text style={globalStyles.body}>
                            {CarQueryApi.drivetrainType(model, true, true)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.arrowContainer}>
                <AntDesign name="right" style={styles.arrowIcon} />
            </View>
        </Pressable>
    );
};

export default ModelBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e5e5e5",
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        flexDirection: "row",
    },
    detailsContainer: {
        width: "87%",
    },
    arrowContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingStart: "5%",
    },
    header: {
        paddingBottom: 15,
    },
    overview: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    arrowIcon: {
        ...globalStyles.title2,
        opacity: 0.7,
    },
});
