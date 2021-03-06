import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {Button, Gap, Input, Loading, Offline} from '../../components';
import {colors, storeData, useForm, getData, showError} from '../../utils';

const Login = ({navigation}) => {
  const netInfo = useNetInfo();

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('user').then((user) => {
      if (user) {
        navigation.replace('Success');
      }
    });
  }, [navigation]);

  const login = async () => {
    setLoading(true);

    if (!form.email || !form.password) {
      setLoading(false);
      showError('Email dan password wajib diisi!');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: form.email, password: form.password}),
    };

    fetch(
      `http://c21acf9f055a.ngrok.io/api/v1/users/authenticate`,
      requestOptions,
    )
      .then((response) => {
        return response.text().then((text) => {
          const data = text && JSON.parse(text);

          if (!response.ok) {
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        });
      })
      .then((user) => {
        storeData('user', {email: form.email, password: form.password});
        setLoading(false);
        navigation.replace('Success');
      })
      .catch((error) => {
        setLoading(false);
        navigation.navigate('Failed', error);
      });
  };

  return (
    <>
      <View style={styles.page}>
        {!netInfo.isConnected && <Offline />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <Text style={styles.title}>Silahkan Login</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Log In" onPress={login} />
          <Gap height={30} />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
