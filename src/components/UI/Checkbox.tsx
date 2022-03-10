import React, { useRef } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import Foundation from 'react-native-vector-icons/Foundation';

interface GreetingsProps {
    label?: string;
    onClickHandler?(event: Event): void;
    active: boolean;
}

const Checkbox = (props: GreetingsProps) => {
    return (
        <Pressable
            style={styles.checkbox}
            onPress={props.onClickHandler || null}>
            <Foundation name="checkbox" size={36} color={props.active ? '#3498db' : 'gray'}></Foundation>
            {props.label &&
                (
                    <View style={styles.label}>
                        <Text style={styles.labelText}>{props.label}</Text>
                    </View>
                )
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 10,
    },
    labelText: {
        fontSize: 20
    }
});

export default Checkbox;