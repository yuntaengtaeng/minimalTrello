import React from 'react';
import {
    Text,
    Pressable,
    StyleSheet
} from 'react-native';
import DefaultView from '../components/UI/DefaultView';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import itemsSlice, { Card, CardInfo } from '../slices/items';
import { useAppDispatch } from '../store';
import CardUpsert from '../components/CardUpsert';
import { InitialState } from '../components/CardUpsert';

type AddCardScreenProps = NativeStackScreenProps<RootStackParamList, 'CardDetail'>;


const AddCard = ({ route, navigation }: AddCardScreenProps) => {
    const { parentId, description, isChecked, lable, id }: Card = route.params.cardInfo;
    console.log(route.params.cardInfo);

    const dispatch = useAppDispatch();

    const initialState: InitialState =
    {
        ...!!description && {
            initDescription: description
        },
        ...!!isChecked && {
            initIsChecked: isChecked
        },
        ...!!lable && {
            initSelcetedLabel: [lable]
        }
    };

    const onDeleteHandler = () => {
        dispatch(itemsSlice.actions.deleteCardHandler({
            parentId,
            id
        }));
        navigation.pop();
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={onDeleteHandler}>
                    <Text style={styles.deleteButton}>delete</Text>
                </Pressable>
            ),
        });
    }, [navigation]);

    const onSubmit = (card: CardInfo) => {
        const CardData: Card = {
            id,
            ...card,
        }
        dispatch(itemsSlice.actions.updateCardHandler(CardData));
        navigation.pop();
    };

    return (
        <DefaultView customStyle={{
            flex: 1,
            paddingHorizontal: 8
        }}>
            <CardUpsert onSubmit={onSubmit}
                parentId={parentId}
                buttonLabel="Modify"
                initialState={initialState}
            />
        </DefaultView>
    )
};

const styles = StyleSheet.create({
    deleteButton: {
        fontSize: 16,
        color: '#fff',
    }
});

export default AddCard;