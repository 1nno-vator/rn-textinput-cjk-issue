# 리액트 네이티브 CJK 입력 간 동적 스타일 이슈

## 버전정보

```
"react": "18.2.0",
"react-native": "0.72.6"
```

## 이슈내용

- CJK 문자를 입력할 때, 동적 스타일이 적용되지 않는 이슈
- 짝수 글자는 빨간색, 홀수 글자는 파란색으로 나타나게 하였을 때

- 영문으로 입력 시 👉🏻[영상링크](https://ms-nest.notion.site/ms-nest/CJK-c6b2891503624729805cc85e717d080d)
- 한글로 입력 시 👉🏻[영상링크](https://ms-nest.notion.site/ms-nest/CJK-c6b2891503624729805cc85e717d080d)

### 전체코드

```tsx
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
                    style={{color: index % 2 === 0 ? 'red' : 'blue'}}> // 색 변동
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
```
