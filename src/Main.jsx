import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TextInput
} from 'react-native';
import {
    useTheme,
    Appbar,
    FAB,
    Portal,
    // TextInput
} from 'react-native-paper';
import uuid from "react-native-uuid";



export default function Main() {
    const theme = useTheme();
    const [field, setField] = useState([
        { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
        // { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
    ]);

    const [length, setLength] = useState(field.length == 2)

    function getTotalCredit() {
        const totalCredits = field.reduce(
            (total, data) => total + parseInt(data.CREDIT),
            0
        );
        return totalCredits;
    }

    function getPoints(points) {
        switch (points) {
            case "A":
                return 5.0;
            case "a":
                return 5.0;

            case "B":
                return 4.0;
            case "b":
                return 4.0;

            case "C":
                return 3.0;
            case "c":
                return 3.0;

            case "D":
                return 2.0;
            case "d":
                return 2.0;

            case "E":
                return 1.0;
            case "e":
                return 1.0;

            case "F":
                return 0.0;
            case "f":
                return 0.0;

            default:
                return 0.0;
        }
    }

    function get_All_GRADE_X_CREDIT() {
        const cal = field.reduce(
            (total, data) => total + getPoints(data.GRADE) * parseInt(data.CREDIT),
            0
        );
        return cal;
    }

    const getGPA = () => get_All_GRADE_X_CREDIT() / getTotalCredit() || "Calculating...."

    return (
        <ScrollView>
            <Portal>
                <Appbar.Header>
                    <Appbar.Content title={`Your GPA is             ${getGPA() == 5.0 ? getGPA().toFixed(1) : getGPA()}`} />
                </Appbar.Header>
            </Portal>
            <Portal>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() =>
                        setField((currentField) => [
                            ...currentField,
                            {
                                id: uuid.v4(),
                                COURSE: "",
                                GRADE: "",
                                CREDIT: "",
                            },
                        ])
                    }
                />
            </Portal>
            <Portal>
                <FAB
                    icon="minus"
                    style={styles.fab2}
                    onPress={() =>
                        setField((currentField) =>
                            currentField.length > 1
                                ? currentField.splice(-1, 1)
                                : currentField
                        )
                    }
                />
            </Portal>
            {/* <Portal>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() =>
                        setField((currentField) => [
                            ...currentField,
                            {
                                id: uuid.v4(),
                                COURSE: "",
                                GRADE: "",
                                CREDIT: "",
                            },
                        ])
                    }
                />
            </Portal> */}
            <View style={{ marginTop: 100 }}>
                {field.map((d) => (
                    <View key={d.id} style={{}}>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: 10,
                            paddingRight: 5,
                            paddingLeft: 5,
                            paddingBottom: 10
                        }}>
                            <TextInput
                                // mode='outlined'
                                placeholder="COURSE"
                                value={d.COURSE}
                                style={{
                                    fontSize: 18,
                                    textAlign: "center",
                                    borderWidth: 2,
                                    width: 110,
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderColor: theme.colors.primary,
                                }}
                                onChangeText={(text) =>
                                    setField((currentField) =>
                                        currentField.map((x) =>
                                            x.id === d.id
                                                ? {
                                                    ...x,
                                                    COURSE: text,
                                                }
                                                : x
                                        )
                                    )
                                }
                            />
                            <TextInput
                                // mode='outlined'
                                value={d.GRADE}
                                placeholder="GRADE"
                                style={{
                                    fontSize: 18,
                                    textAlign: "center",
                                    borderWidth: 2,
                                    width: 110,
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderColor: theme.colors.primary,
                                }}
                                onChangeText={(text) =>
                                    setField((currentField) =>
                                        currentField.map((x) =>
                                            x.id === d.id
                                                ? {
                                                    ...x,
                                                    GRADE: text,
                                                }
                                                : x
                                        )
                                    )
                                }
                            />
                            <TextInput
                                // mode='outlined'
                                value={d.CREDIT}
                                placeholder="CREDIT"
                                style={{
                                    fontSize: 18,
                                    textAlign: "center",
                                    borderWidth: 2,
                                    width: 110,
                                    borderBottomRightRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    borderColor: theme.colors.primary,
                                }}
                                keyboardType="numeric"
                                onChangeText={(text) =>
                                    setField((currentField) =>
                                        currentField.map((x) =>
                                            x.id === d.id
                                                ? {
                                                    ...x,
                                                    CREDIT: text,
                                                }
                                                : x
                                        )
                                    )
                                }
                            />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
    },
    fab3: {

    }
})