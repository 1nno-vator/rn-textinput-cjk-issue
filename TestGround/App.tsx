/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  Pressable,
} from 'react-native';

function App(): JSX.Element {
  const ref = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeText = (text: string) => {
    setInputValue(text);
  };

  const keyboardDissmiss = () => Keyboard.dismiss();

  const clearInput = () => {
    setInputValue('');
    ref?.current?.clear();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <TextInput
          ref={ref}
          style={styles.textInput}
          multiline={true}
          // value={inputValue}
          onChangeText={onChangeText}>
          {inputValue
            ? Array.from(inputValue)?.map((char, index) => {
                return (
                  <Text
                    key={`${char}_${index}`}
                    style={{color: index % 2 === 0 ? 'red' : 'blue'}}>
                    {char}
                  </Text>
                );
              })
            : ''}
        </TextInput>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={keyboardDissmiss}>
            <Text style={styles.buttonText}>blur</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.ml4]} onPress={clearInput}>
            <Text style={styles.buttonText}>clear</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
  ml4: {
    marginLeft: 4,
  },
});

export default App;
