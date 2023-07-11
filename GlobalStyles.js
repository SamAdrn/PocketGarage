import { StyleSheet } from "react-native";
import {
    material,
    robotoWeights,
    materialColors,
    iOSUIKit,
    sanFranciscoWeights,
    iOSColors,
} from "react-native-typography";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    gridContainer: {
        alignItems: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    formContainer: {
        gap: 30,
    },
    stickyButtonContainer: {
        position: "absolute",
        bottom: 50,
        left: 30,
        flexDirection: "row",
        gap: 20,
    },
    textBold: {
        ...Platform.select({
            ios: {
                ...sanFranciscoWeights.bold,
            },
            android: {
                ...robotoWeights.bold,
            },
        }),
    },
    textMedium: {
        ...Platform.select({
            ios: {
                ...sanFranciscoWeights.medium,
            },
            android: {
                ...robotoWeights.medium,
            },
        }),
    },
    textLight: {
        ...Platform.select({
            ios: {
                ...sanFranciscoWeights.light,
            },
            android: {
                ...robotoWeights.light,
            },
        }),
    },
    textColorLight: {
        ...Platform.select({
            ios: {
                color: iOSColors.gray,
            },
            android: {
                color: materialColors.blackSecondary,
            },
        }),
    },
    title1: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.largeTitleEmphasized,
                paddingVertical: 10,
            },
            android: {
                ...material.display2,
                color: materialColors.blackPrimary,
                paddingTop: 10,
                paddingBottom: 20,
            },
        }),
    },
    title2: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.title3,
            },
            android: {
                ...material.headline,
                color: materialColors.blackPrimary,
            },
        }),
    },
    body: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.body,
                color: iOSColors.black,
            },
            android: {
                ...material.title,
                color: materialColors.blackPrimary,
            },
        }),
    },
    subBody: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.subhead,
                color: iOSColors.black,
            },
            android: {
                ...material.subheading,
                color: materialColors.blackPrimary,
            },
        }),
    },
    footnote: {
        ...Platform.select({
            ios: {
                ...iOSUIKit.caption2,
            },
            android: {
                ...material.caption,
            },
        }),
    },
});
