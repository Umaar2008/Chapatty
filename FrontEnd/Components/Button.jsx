    // components/Button.js
    import React from 'react';
    import { Text, TouchableOpacity, StyleSheet } from 'react-native';

    const Button = ({
    title,
    onPress,
    primary,
    yellow,
    secondary,
    danger,
    success,
    rounded,
    style,
    textStyle,
    disabled,
    }) => {
    let buttonStyles = [styles.base, style];
    let textStyles = [styles.text, textStyle];

    if (primary) buttonStyles.push(styles.primary);
    else if (secondary) buttonStyles.push(styles.secondary);
    else if (danger) buttonStyles.push(styles.danger);
    else if (success) buttonStyles.push(styles.success);
    else if (yellow) buttonStyles.push(styles.yellow);
    if (rounded) buttonStyles.push(styles.rounded);
    if (disabled) buttonStyles.push(styles.disabled);

    return (
        <TouchableOpacity
        onPress={onPress}
        style={buttonStyles}
        activeOpacity={0.7}
        disabled={disabled}
        >
        <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );
    };

    export default Button;

    const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    primary: {
        backgroundColor: '#3b82f6',
    },
    secondary: {
        backgroundColor: '#6b7280',
    },
    yellow : {
        backgroundColor: '#FFBD26'
    },
    danger: {
        backgroundColor: '#ef4444',
    },
    success: {
        backgroundColor: '#10b981',
    },
    rounded: {
        borderRadius: 25,
    },
    disabled: {
        backgroundColor: '#d1d5db',
    },
    });
