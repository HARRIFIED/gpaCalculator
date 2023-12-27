import React, { useState } from 'react';
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
import { getTotalCredit, get_All_GRADE_X_CREDIT } from './usefulFunc';


export default function Main() {
    const theme = useTheme();
    const [field, setField] = useState([
        { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
        { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
    ]);

    const getGPA = () => get_All_GRADE_X_CREDIT(field) / getTotalCredit(field) || "Complete the boxes...."

    return (
        <ScrollView>
            <Portal>
                <Appbar.Header>
                    {/* <Appbar.Content title={`Your GPA is ${formattedGPA}`} />; */}
                    <Appbar.Content title={`Your GPA is               ${[5.0, 4.0, 3.0, 2.0, 1.0, 0.0].includes(getGPA()) ? getGPA().toFixed(1) : getGPA()}`} />
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
                    icon="download"
                    style={styles.fab3}
                    onPress={() =>
                        alert("PDF download  feature coming soon")
                    }

                />
            </Portal>
            <Portal>
                <FAB
                    icon="minus"
                    style={styles.fab2}
                    onPress={() =>
                        setField((currentField) => {
                            return currentField.length > 2 ? [...currentField.slice(0, -1)] : currentField;
                        })
                    }

                />
            </Portal>

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
        // margin: 16,
        right: 10,
        bottom: 16,
    },
    fab2: {
        position: 'absolute',
        // margin: 16,
        left: 10,
        bottom: 16,
    },
    fab3: {
        position: "absolute",
        bottom: 16,
        right: '40%',
    }
})