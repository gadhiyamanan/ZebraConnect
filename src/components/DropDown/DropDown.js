import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "./DropDownStyles";

export default function DropDown({
  zIndex,
  items,
  placeholder,
  value,
  onChangeItem,
  controller,
  onOpen,
  onClose,
  defaultValue=null
}) {
  return (
    <DropDownPicker
      onClose={onClose}
      onOpen={onOpen}
      zIndex={zIndex}
      items={items}
      placeholder={placeholder}
      containerStyle={styles.dropDownContainer}
      style={styles.dropDown}
      selectedValue={value}
      onChangeItem={onChangeItem}
      controller={controller}
      defaultValue={defaultValue}
    />
  );
}
