import React from 'react';
import DefaultView from '../components/UI/DefaultView';

import CardUpsert from '../components/CardUpsert';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import itemsSlice, { CardInfo, Card } from '../slices/items';
import { useAppDispatch } from '../store';
import { generateUUID } from '../util';

type AddCardScreenProps = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

const AddCard = ({ route, navigation }: AddCardScreenProps) => {
    const dispatch = useAppDispatch();
    const { id }: { id: string } = route.params;

    const onSubmit = (card: CardInfo) => {
        const cardData: Card = {
            ...card,
            id: generateUUID(10)
        };
        dispatch(itemsSlice.actions.addCardHandler(cardData));
        navigation.pop();
    };

    return (
        <DefaultView customStyle={{
            flex: 1,
            paddingHorizontal: 8
        }}>
            <CardUpsert onSubmit={onSubmit} parentId={id} buttonLabel="Add" />
        </DefaultView>
    )
};

export default AddCard;