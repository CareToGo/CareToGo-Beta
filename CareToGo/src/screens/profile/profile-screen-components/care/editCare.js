import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import SelectBox from 'react-native-multi-selectbox';
import { Formik } from 'formik';

export default function EditCare({setEditFalse}) {

    const dailyoptions = [
        {
            item: 'Independent',
            id: 1
        },
        {
            item: 'Some Assistance',
            id: 2
        },
        {
            item: 'Full Assistance',
            id: 3
        },
    ]

    const careoptions = [
        {
            item: 'Persoonal Care',
            id: 1
        },
        {
            item: 'Stoma Care',
            id: 2
        },
        {
            item: 'NG Tube Care',
            id: 3
        },
        {
            item: 'Wound Care',
            id: 4
        },
        {
            item: 'Catheter Care',
            id: 5
        },
        {
            item: 'House-Keeping',
            id: 6
        },
        {
            item: 'IV Meds',
            id: 7
        },
        {
            item: 'Transportation',
            id: 8
        },
        {
            item: 'Meal Prep',
            id: 9
        },
        {
            item: 'Respite',
            id: 10
        },
    ]
    
    const [selectedAbility, setSelectedAbility] = useState({})
    const [careneed, setCareNeed] = useState([])

    const onChange = () => {
        return (val) => setSelectedAbility(val)
    }

    const onMultiChange = () => {
        return (item) => {setCareNeed}
    }
    return(
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{
                    mobility: '',
                    feeding: '',
                    toileting: '',
                    bathing: '',
                    meatprep: '',
                    careneeds: []
                }}
                onSubmit={values => console.log(values)}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 10, marginLeft: 10}}>Daily Activity Needs</Text>
                        <Text style={{marginLeft: 10, fontWeight: 'bold', marginBottom: 10}}>Mobility</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Level of Help'
                            options={dailyoptions}
                            value={selectedAbility}
                            onChange={onChange}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{marginLeft: 10, fontWeight: 'bold', marginBottom: 10}}>Feeding</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Level of Help'
                            options={dailyoptions}
                            value={selectedAbility}
                            onChange={onChange}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{marginLeft: 10, fontWeight: 'bold', marginBottom: 10}}>Toileting</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Level of Help'
                            options={dailyoptions}
                            value={selectedAbility}
                            onChange={onChange}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{marginLeft: 10, fontWeight: 'bold', marginBottom: 10}}>Bathing</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Level of Help'
                            options={dailyoptions}
                            value={selectedAbility}
                            onChange={onChange}
                        />
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{marginLeft: 10, fontWeight: 'bold', marginBottom: 10}}>Meatprep</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Level of Help'
                            options={dailyoptions}
                            value={selectedAbility}
                            onChange={onChange}
                        />
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 10, marginLeft: 10}}>Care Needs</Text>
                        <SelectBox
                            style={{margin: 20}}
                            label='Select Care Needs'
                            options={careoptions}
                            selectedValues={careneed}
                            onMultiSelect={onMultiChange}
                            isMulti
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancel} onPress={setEditFalse}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.save}>
                                <Text>Save</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                
                )}
            </Formik>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        left: 20,
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