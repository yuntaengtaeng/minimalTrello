import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Input from './UI/Input';
import Checkbox from './UI/Checkbox';
import LabelGroup from './LabelGroup';
import Button from './UI/Button';

import { CardInfo } from '../slices/items';

type GreetingsProps = {
    onSubmit(item: CardInfo): void;
    parentId: string;
    buttonLabel: string;
    initialState?: InitialState;
};

export type InitialState = {
    initDescription?: string;
    initIsChecked?: boolean;
    initSelcetedLabel?: string[];
};

const LABEL_COLOR_MAP: string[] = [
    '#61bd4f',
    '#f2d600',
    '#ff9f1a',
    '#eb5946',
    '#c277e0',
    '#0079bf'
];

const CardUpsert = (props: GreetingsProps) => {
    const { initDescription, initIsChecked, initSelcetedLabel } = props.initialState || {};

    const [description, setDescription] = useState<string>(initDescription || '');
    const [isChecked, setIsChecked] = useState<boolean>(initIsChecked || false);
    const [selcetedLabel, setSelcetedLabel] = useState<string[]>(initSelcetedLabel || []);

    const onChangeText = (text: string) => {
        setDescription(text);
    };

    const CheckboxHandler = () => {
        setIsChecked((prev) => !prev);
    };

    const itemClickHandler = (color: string) => {
        const clone: string[] = [...selcetedLabel];

        if (clone.includes(color)) {
            setSelcetedLabel([]);
        } else {
            const selected: string[] = [];
            selected.push(color);
            setSelcetedLabel(selected);
        }
    };

    const onPress = () => {
        const cardData: CardInfo = {
            description,
            isChecked,
            parentId: props.parentId,
            ...!!selcetedLabel[0] && {
                lable: selcetedLabel[0]
            },
        };

        props.onSubmit(cardData);
    };

    const addButtonDisabled = !description.trim();

    return (
        <>
            <View style={styles.field}>
                <Input placeholder="Edit Card description"
                    value={description}
                    onChangeTextCallback={onChangeText}
                ></Input>
            </View>
            <View style={styles.field}>
                <Text style={styles.label}>Label</Text>
                <LabelGroup palette={LABEL_COLOR_MAP} selectedItems={selcetedLabel} itemClickHandler={itemClickHandler}></LabelGroup>
            </View>
            <View style={styles.field}>
                <Checkbox active={isChecked} onClickHandler={CheckboxHandler} label="Check"></Checkbox>
            </View>
            <Button disabled={addButtonDisabled} label={props.buttonLabel} onPress={onPress}
                customStyle={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 0
                }}
            ></Button>
        </>
    )
};

const styles = StyleSheet.create({
    field: {
        marginBottom: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default CardUpsert;