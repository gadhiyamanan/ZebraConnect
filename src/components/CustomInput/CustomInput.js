import React from 'react'
import { TextInput } from 'react-native';
import { styles } from './CustomInputStyles';

export default function CustomInput({placeholder, value, isEditable, onChangeText, inModal=false, keyboardType="default"}) {
    return (
      <TextInput
        style={inModal ? styles.modalRemarkInput : styles.input}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor={"#9E9E9E"}
        value={value}
        editable={isEditable}
        onChangeText={isEditable ? onChangeText : undefined}
        numberOfLines={isEditable ? 4 : undefined}
        multiline={isEditable ? true : undefined}
        keyboardType={keyboardType}
      />
    );
}