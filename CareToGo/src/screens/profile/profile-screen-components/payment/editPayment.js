import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {Formik} from 'formik';

export default function EditPayments({setToFalse}) {
    return(
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{
                    bankName: '',
                    accNo: '',
                    branchNo: '',
                    bankNo: ''
                }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <View style={styles.bankNameContainer}>
                        <Text style={{marginLeft: 40, fontWeight: 'bold'}}>Institution Name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('bankName')}
                            onBlur={handleBlur('bankNo')}
                            value={values.institutionName}
                        />
                    </View>
                    <View style={styles.bankNameContainer}>
                        <Text style={{marginLeft: 40, fontWeight: 'bold'}}>Account Number:</Text>
                        <TextInput
                            style={styles.numericInput}
                            onChangeText={handleChange('accNo')}
                            onBlur={handleBlur('accNo')}
                            value={values.institutionName}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.bankNameContainer}>
                        <Text style={{marginLeft: 40, fontWeight: 'bold'}}>Branch Number:</Text>
                        <TextInput
                            style={styles.numericInput}
                            onChangeText={handleChange('branchNo')}
                            onBlur={handleBlur('branchNo')}
                            value={values.institutionName}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.bankNameContainer}>
                        <Text style={{marginLeft: 40, fontWeight: 'bold'}}>Institution Number:</Text>
                        <TextInput
                            style={styles.numericInput}
                            onChangeText={handleChange('bankNo')}
                            onBlur={handleBlur('bankNo')}
                            value={values.institutionName}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancel} onPress={setToFalse}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.save} onPress={handleSubmit}>
                            <Text>Save</Text>
                        </TouchableOpacity>
                    </View>                     
                </View>
                )}
            </Formik>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1
    },
    bankNameContainer: {
        marginTop: 20
    },
    input: {
        height: 40,
        width: '70%',
        marginTop: 10,
        marginHorizontal: 40,
        borderWidth: 1,
        padding: 10,
    },
    numericInput: {
        height: 40,
        width: '50%',
        marginTop: 10,
        marginHorizontal: 40,
        borderWidth: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        left: 20,
        top: 100
    },
    cancel: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        top: 30,
        left: 10
    },
    save: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        top: 30,
        left: 10
    }
})