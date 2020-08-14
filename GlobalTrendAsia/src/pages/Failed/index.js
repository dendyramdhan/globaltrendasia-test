import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData, clearData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Gap} from '../../components';

export default function Failed({navigation, route}) {
  const error = route.params;

  const back = async () => {
    clearData();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Login Failed</Text>
      {error && <Text style={styles.subTitle}>{error}</Text>}
      <Gap height={40} />
      <Button title="Kembali" onPress={back} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, paddingHorizontal: 40, paddingTop: 80},
  title: {fontSize: 40},
  subTitle: {fontSize: 20, color: 'red'},
});
