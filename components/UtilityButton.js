import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const UtilityButton = ({ onPress, disabled = false }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonContainer,
                pressed && { opacity: 0.6 },
                disabled && { opacity: 0.5 },
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <AntDesign name="left" style={styles.buttonContent} />
        </Pressable>
    );
};

export default UtilityButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#e5383b",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
    },
    buttonContent: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
    },
});
