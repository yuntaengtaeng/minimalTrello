import React from 'react'
import {
    TextInput,
    StyleSheet,
    StyleProp,
    ViewStyle
} from 'react-native';

type GreetingsProps = {
    placeholder?: string;
    value?: string;
    onChangeTextCallback?(text: string): void;
    customStyle?: StyleProp<ViewStyle>;
};


const Input = (props: GreetingsProps) => {
    return (
        <TextInput placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeTextCallback}
            style={[styles.input, props.customStyle]}
            selectionColor={'#3498db'}
        />
    )
};

const styles = StyleSheet.create({
    input: {
        padding: 0,
        paddingLeft: 8,
        margin: 0,
        height: 48,
        borderColor: '#3498db',
        borderStyle: 'solid',
        borderWidth: 1,
        fontSize: 20,
    }
});

export default Input;