import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { View } from './View';
import { Icon } from './Icon';
import { Button } from './Button';
import { Colors } from '../config';

export const TextInput = ({
  width = '100%',
  leftIconName,
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.lightBlue,
        borderRadius: 100,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: 'transparent'
      }}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={Colors.customBlue}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <RNTextInput
        style={{
          flex: 1,
          width: '100%',
          outline: 'none',
          fontSize: 18,
          color: Colors.customBlue,
          fontFamily: 'Gotham'
        }}
        placeholderTextColor={Colors.customBlue}
        {...otherProps}
      />
      {rightIcon ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={Colors.customBlue}
            style={{ marginRight: 10 }}
          />
        </Button>
      ) : null}
    </View>
  );
};
