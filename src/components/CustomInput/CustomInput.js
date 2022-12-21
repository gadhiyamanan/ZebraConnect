import React from 'react'
import { TextInput } from 'react-native';
import { styles } from './CustomInputStyles';

export default function CustomInput({placeholder, value, isEditable,multiline=true, onChangeText, inModal=false, keyboardType="default"}) {
    return (
      <TextInput
        style={inModal ? styles.modalRemarkInput : [styles.input,!multiline&&{height:40}]}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={"#9E9E9E"}
        value={value}
        editable={isEditable}
        onChangeText={onChangeText}
        numberOfLines={isEditable ? 4 : undefined}
        multiline={isEditable ? true : multiline}
        keyboardType={keyboardType}
      />
    );
}