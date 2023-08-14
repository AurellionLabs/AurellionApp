import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

interface WrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  spinnerText?: string;
  isError?: boolean;
  setIsError?: Dispatch<SetStateAction<boolean>>;
  errorText?: string;
}
const Wrapper = ({
  children,
  isLoading,
  spinnerText,
  isError,
  setIsError,
  errorText,
}: WrapperProps) => {
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading ?? false}
        textContent={spinnerText ?? "Loading..."}
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsError && setIsError(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Wrapper;
