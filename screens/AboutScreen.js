import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { globalStyles } from "../GlobalStyles";
import Spacer from "../components/Spacer";

const AboutScreen = () => {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.title1}>Pocket Garage</Text>
            <Text style={[globalStyles.title2, globalStyles.textLight]}>
                Created By: Samuel A. Kosasih
            </Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>What is Pocket Garage?</Text>
                <Text style={styles.sectionContent}>
                    Pocket Garage is an innovative automobile data retrieval
                    application designed to provide users with quick and
                    detailed information about various vehicles. Now, you can
                    effortlessly access comprehensive vehicle information,
                    including specifications such as the body classification,
                    fuel type, drivetrain details, engine specifications, and
                    much more. With Pocket Garage, you can streamline your car
                    research process and make informed decisions with ease.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Inspiration Behind the Application
                </Text>
                <Text style={styles.sectionContent}>
                    The inspiration behind Pocket Garage stems from my personal
                    experience in searching for cars. As I scoured various
                    marketplaces for potential vehicles, I realized the
                    significant amount of time and effort spent on individually
                    searching for information about each car. Motivated to
                    simplify this process for others, I embarked on developing
                    Pocket Garage. Additionally, this app reflects my passion
                    for the automotive world, while also providing me with an
                    exciting opportunity to improve my React Native development
                    skills.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Future Development</Text>
                <Text style={styles.sectionContent}>
                    Cars are complex machines, and there is a vast amount of
                    information to cover for each specific car. While I wish to
                    provide more comprehensive details that would please car
                    nerds, enhance the visual experience by incorporating images
                    of cars from various angles, and many more exciting ideas
                    for the app, there are limitations in accessing databases
                    that are affordable and reliable. As a student, I work on
                    these projects during my free time with limited resources.
                    Nevertheless, I am continuously learning and exploring new
                    possibilities. Future plans include implementing features
                    that allow users to bookmark their favorite cars and
                    introducing a captivating "Car of the Day" section. There is
                    still much to discover and achieve in my journey as a
                    Software Engineer.
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Acknowledgements</Text>
                <Text style={styles.sectionContent}>
                    Developed using the Expo framework.{"\n\n"}All vehicle
                    information is retrieved from the{" "}
                    <Text style={globalStyles.textBold}>CarQuery API</Text>.
                    {"\n\n"}Check out{" "}
                    <Text style={globalStyles.textBold}>
                        React Native Dropdown Picker by hossein-zare
                    </Text>{" "}
                    for the simplistic dropdowns and{" "}
                    <Text style={globalStyles.textBold}>
                        React Native Typography by hectahertz
                    </Text>{" "}
                    for the beautiful fonts.{"\n\n"}
                    Check out my personal website at{"\n"}
                    <Text style={globalStyles.textBold}>
                        samadrn.github.io/ePortfolio/
                    </Text>
                    {"\n"}to learn more about me.
                </Text>
            </View>
            <Spacer />
        </ScrollView>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    section: { paddingTop: 40 },
    sectionTitle: { ...globalStyles.body, paddingBottom: 10 },
    sectionContent: {
        ...globalStyles.subBody,
        lineHeight: 20,
        paddingBottom: 5,
    },
});
