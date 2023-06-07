import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const MainButton = ({ title, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.buttonContainer,
                pressed && { opacity: 0.6 },
            ]}
            onPress={onPress}
        >
            <Text style={styles.buttonContent}>{title}</Text>
        </Pressable>
    );
};

export default MainButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#FCA311",
        borderRadius: 20,
        padding: 10,
        width: "100%",
        alignItems: "center",
        flex: 1,
    },
    buttonContent: {
        color: "white",
        fontWeight: "bold",
        fontSize: 19
    }
});
