import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';

export default function Success({navigation}) {
  const [user, setUser] = useState(null);
  //   AsyncStorage.clear();
  useEffect(() => {
    getData('user').then((user) => {
      if (!user) {
        navigation.replace('Login');
      }

      setUser(user);
    });
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Text>Success {JSON.stringify(user)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
