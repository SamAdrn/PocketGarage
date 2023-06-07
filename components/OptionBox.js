import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const OptionBox = ({ title, onPress }) => {
    return (
        <View style={styles.optionContainer}>
            <Pressable
                style={({ pressed }) => [
                    styles.optionContent,
                    pressed && { opacity: 0.6 },
                ]}
                onPress={onPress}
            >
                <Text>{title}</Text>
            </Pressable>
        </View>
    );
};

export default OptionBox;

const styles = StyleSheet.create({
    optionContainer: {
        width: "50%",
        aspectRatio: 1,
        padding: 10,
    },
    optionContent: {
        backgroundColor: "#e5e5e5",
        shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
        borderRadius: 20,
        flex: 1,
        padding: 15,
    },
});
