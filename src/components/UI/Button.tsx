import React from "react"; // 리액트 호출
import { TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

type GreetingsProps = {
    label: string;
    onPress(): void;
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
};

const Button = ({ label, onPress, customStyle, disabled }: GreetingsProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, customStyle, {
                ...disabled && {
                    backgroundColor: '#f4f4f4',
                    borderColor: '#f4f4f4',
                }
            }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        padding: 4,
        height: 48,
        borderRadius: 8,
        borderColor: '#3498db',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    }
});

export default Button;