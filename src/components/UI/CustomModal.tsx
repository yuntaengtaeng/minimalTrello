import React from 'react';
import { Modal, StyleSheet, View, Dimensions } from 'react-native';

interface GreetingsProps {
    modalVisible: boolean;
    children: React.ReactNode;
}

const CustomModal = (props: GreetingsProps) => {
    return (
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={props.modalVisible}>
            <View style={styles.container}>
                <View
                    style={styles.blankSpace}
                />
                <View style={styles.contents}>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blankSpace: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000000',
        zIndex: 100,
        opacity: 0.8,
    },
    contents: {
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 200,
        width: '80%',
    }
});

export default CustomModal;
