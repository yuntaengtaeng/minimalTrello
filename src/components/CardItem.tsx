import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native'
import { RootStackParamList } from '../../App';

import itemsSlice, { Card, CardCheckChange } from '../slices/items';
import { useAppDispatch } from '../store';
import Checkbox from './UI/Checkbox';

const CardItem = (props: Card) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();

    const onClickHandler = (event: Event) => {
        const isChecked = !props.isChecked;

        const obj: CardCheckChange = {
            isChecked,
            id: props.id,
            parentId: props.parentId
        };
        dispatch(itemsSlice.actions.changeCardChecked(obj));
    };

    const moveDetail = useCallback(() => {
        navigation.navigate(
            'CardDetail',
            {
                cardInfo: props
            },
        );
    }, [props.isChecked]);

    return (
        <View
            style={styles.cardItem}>
            <Pressable
                style={[styles.cardItem, { flex: 1 }]}
                onPress={moveDetail}>
                <View style={[styles.label, {
                    ...!!props.lable && {
                        backgroundColor: props.lable
                    }
                }]}></View>
                <Text>{props.description}</Text>
            </Pressable>
            <View style={styles.checkbox}>
                <Checkbox onClickHandler={onClickHandler} active={props.isChecked}></Checkbox>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        width: 24,
        height: 24,
        marginRight: 8
    },
    cardItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginLeft: 'auto',
    }
});

export default CardItem;