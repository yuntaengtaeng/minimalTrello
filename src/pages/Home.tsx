import React, { useCallback, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import DefaultView from '../components/UI/DefaultView';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import BoardItem from '../components/BoardItem';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';

import itemsSlice, { Board } from '../slices/items';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeScreenProps) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState<string>('');
    const boards = useSelector((state: RootState) => state.items.items);

    const onChangeText = (text: string) => {
        setText(text);
    };

    const addBoard = () => {
        if (!text.trim()) {
            return Alert.alert('보드 이름을 입력해주세요');
        }

        const clone = [...boards];

        const hasDuplicateName = clone.some((v) => v.boardName === text);

        if (hasDuplicateName) {
            return Alert.alert('보드 이름이 중복됩니다.');
        }

        dispatch(itemsSlice.actions.addBoardHandler(text));
        setText('');
    };

    const boardList = useCallback(({ item }: { item: Board }) => {
        return <BoardItem key={item.id} id={item.id}
            boardName={item.boardName}
            child={item.child}
        ></BoardItem>
    }, []);

    return (
        <DefaultView customStyle={{
            paddingHorizontal: 8
        }}>
            <View>
                <Text style={styles.title}>Add Board</Text>
                <View style={styles.addArea}>
                    <Input
                        customStyle={{ flex: 1 }}
                        value={text} onChangeTextCallback={onChangeText}></Input>
                    <Button
                        label='추가'
                        customStyle={{ borderRadius: 0, flex: 0.3 }}
                        onPress={addBoard}></Button>
                </View>
            </View>
            <FlatList
                data={boards}
                keyExtractor={(b: Board) => String(b.id)}
                renderItem={boardList}
            />
        </DefaultView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    addArea: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Home;