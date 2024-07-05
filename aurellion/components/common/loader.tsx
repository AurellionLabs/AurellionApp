import React, { Dispatch, SetStateAction} from 'react';
import { Modal, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Button, ButtonText } from '@/components/common/StyledComponents';
import { LightTheme } from '@/constants/Colors';



interface LoaderProps {
  isLoading?: boolean;
  spinnerText?: string;
  isError?: boolean;
  setIsError?: Dispatch<SetStateAction<boolean>>;
  errorText?: string;
}
const Loader = ({ isLoading, spinnerText, isError, setIsError, errorText }: LoaderProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Spinner
        visible={isLoading ?? false}
        textContent={spinnerText ?? 'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isError ?? false}
        onRequestClose={() => {
          setIsError && setIsError(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorText}</Text>
            <Button
              isDarkMode={isDarkMode}
              backgroundColor={LightTheme.accent}
              onPress={() => setIsError && setIsError(false)}
            >
              <ButtonText>Close</ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Loader;
