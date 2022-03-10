import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

import CustomModal from './UI/CustomModal';
import Button from './UI/Button';
import OutlineButton from './UI/OutlineButton';
import CardItem from './CardItem';

import itemsSlice, { Board, Card } from '../slices/items';
import { useAppDispatch } from '../store';

const BoardItem = (props: Board) => {
    const dispatch = useAppDispatch();
    const [modalShowing, setModalShowing] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const cardItems = props.child.map((card: Card) => (
        <CardItem key={card.id}
            description={card.description}
            id={card.id}
            lable={card.lable}
            isChecked={card.isChecked}
            parentId={card.parentId}
        />
    ));

    return (
        <>
            <View style={styles.boardContent}>
                <View style={styles.boardTitle}>
                    <Text style={styles.boardName}>{props.boardName}</Text>
                    <Text style={styles.boardDelete} onPress={() => {
                        setModalShowing(true);
                    }}>delete</Text>
                </View>
                {cardItems}
                <View style={styles.cardAddArea}>
                    <Text onPress={() => {
                        navigation.navigate(
                            'AddCard',
                            { id: props.id },
                        );
                    }}>+ Add Card</Text>
                </View>
            </View>
            <CustomModal modalVisible={modalShowing}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>보드를 삭제하시겠습니까?</Text>
                    <View style={styles.modalButtonArea}>
                        <Button
                            customStyle={styles.modalButton}
                            label='예' onPress={() => {
                                setModalShowing(false);
                                dispatch(itemsSlice.actions.deleteBoardHandler(props.id));
                                Alert.alert(`${props.boardName} 삭제되었습니다.`);
                            }}></Button>
                        <OutlineButton label='아니오' customStyle={styles.modalButton} onPress={() => {
                            setModalShowing(false);
                        }}></OutlineButton>
                    </View>
                </View>
            </CustomModal>
        </>
    )
};

const styles = StyleSheet.create({
    boardContent: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f5f5f7',
    },
    boardTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boardName: {
        fontWeight: 'bold',
        fontSize: 26
    },
    boardDelete: {
        color: 'red',
        textDecorationLine: 'underline',
        fontSize: 16
    },
    cardAddArea: {
        marginTop: 8
    },
    modalView: {
        padding: 12,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 40,
        fontWeight: 'bold'
    },
    modalButtonArea: {
        display: 'flex',
        flexDirection: 'row'
    },
    modalButton: {
        flex: 1,
        borderRadius: 0,
    }
});


export default BoardItem;