import React from 'react';
import {
    View,
    Pressable,
    StyleSheet
} from 'react-native';

type GreetingsProps = {
    palette: string[];
    selectedItems: string[];
    itemClickHandler(target: string): void;
};

const LabelGroup = (props: GreetingsProps) => {
    return (
        <View style={styles.group}>
            {props.palette.map((color: string) => (
                <Pressable onPress={() => {
                    props.itemClickHandler(color);
                }}
                    key={color}
                >
                    <View style={[styles.box, {
                        backgroundColor: color,
                        ...!props.selectedItems.includes(color) && {
                            opacity: 0.3
                        }
                    }]}></View>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 36,
        height: 36,
    },
    group: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default LabelGroup;