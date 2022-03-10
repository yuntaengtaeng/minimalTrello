import React from "react"; // 리액트 호출
import { TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from "react-native";

type GreetingsProps = {
    label: string;
    onPress(): void;
    customStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
};

const OutlineButton = ({ label, onPress, customStyle, disabled }: GreetingsProps) => {
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
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 8,
        borderColor: '#3498db',
        borderStyle: 'solid',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        textAlign: 'center',
        color: '#3498db',
        fontSize: 24
    }
});

export default OutlineButton;