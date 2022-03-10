import React from 'react';
import { View, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import DismissKeyboardView from './DismissKeyboardView';

type GreetingsProps = {
    children: React.ReactNode;
    customStyle?: StyleProp<ViewStyle>;
};

const DefaultView = (props: GreetingsProps) => {
    return (
        <DismissKeyboardView style={[styles.view, props.customStyle]}>
            {props.children}
        </DismissKeyboardView>
    )
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#fff',
        flex: 1
    }
});

export default DefaultView;


// import React from 'react';
// import {
//   TouchableWithoutFeedback,
//   Keyboard,
//   StyleProp,
//   ViewStyle,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

// const DismissKeyboardView = ({children, ...props}) => (
//   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     <KeyboardAwareScrollView {...props} style={props.style}>
//       {children}
//     </KeyboardAwareScrollView>
//   </TouchableWithoutFeedback>
// );

// export default DismissKeyboardView;