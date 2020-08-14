import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Failed({navigation, route}) {
  const error = route.params;
  return (
    <View>
      <Text>Failed Page</Text>
      <Text>{typeof error === 'string' ? error : 'Internal Error'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
