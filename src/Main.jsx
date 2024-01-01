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
} from 'react-native-paper';
import uuid from "react-native-uuid";
import { getTotalCredit, get_All_GRADE_X_CREDIT } from './usefulFunc';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';



export default function Main() {
    const theme = useTheme();
    const [field, setField] = useState([
        { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
        { id: uuid.v4(), COURSE: "", GRADE: "", CREDIT: "" },
    ]);

    const getGPA = () => get_All_GRADE_X_CREDIT(field) / getTotalCredit(field) || "Complete the boxes...."

    var studentData = field

    // We Generate table rows from data
    var tableRows = studentData.map(student => {
        return `<tr>
                <td>${student.COURSE}</td>
                <td>${student.GRADE}</td>
                <td>${student.CREDIT}</td>
            </tr>`
    }).join('');

    // HTML code
    var htmlString = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student Information</title>
                <style>
                    table {
                        width: 50%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }

                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }

                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body style="text-align: center;">

            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: bold;">Student Information</h12>
            <h2>Student GPA ${getGPA()} </h2>       
            <table>
            <thead>
                <tr>
                <th>Courses</th>
                <th>Grades</th>
                <th>Credits</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows} 
            </tbody>
            </table>

            </body>
        </html>`
        ;

    async function createPDF() {
        const options = {
            html: htmlString,
            fileName: 'studentInfo',
            directory: 'Documents',
        };
        const { uri } = await Print.printToFileAsync(options);
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }


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
                    onPress={createPDF}

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