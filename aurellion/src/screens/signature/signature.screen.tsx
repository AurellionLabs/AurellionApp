import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, ButtonText, StyledText } from '../../common/components/StyledComponents';
import { LightTheme, DarkTheme } from '../../common/constants/Colors';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { JobsScreenNavigationProp, SignatureScreenRouteProp } from '../../navigation/types';
import { useMainContext } from '../main.provider';
import { customerPackageSign, driverPackageSign } from '../../dapp-connectors/dapp-controller';
import { navigateDeepLink } from '../../utils/ExplorerUtils';
import Loader from '../../common/loader/loader';
import { listenForSignature } from '../../dapp-connectors/dapp-listener';

const SignatureScreen = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const { universalLink, deepLink, wcURI, userType, setRefetchDataFromAPI, isDarkMode } = useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { heading, job } = route.params;
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [allSigned, setAllSigned] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;

  // can use the data from the jouney object for addresses
  const onPress = async () => {
    setIsLoading(true);
    console.log('packageSign');
    await packageSign();
    console.log('packageSign complete');
    await allSignedCheck();
  };
  async function packageSign() {
    try {
      navigateDeepLink(universalLink, deepLink, wcURI);
      if (userType === 'customer') {
        await customerPackageSign(job.jobId);
      } else if (userType === 'driver') {
        await driverPackageSign(job.jobId);
      }
      console.log('setIsSigned');
      setIsLoading(false);
      setIsSigned(true);
      setRefetchDataFromAPI(true);
      allSignedCheck();
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error Signing off Package');
    } finally {
    }
  }
  async function allSignedCheck() {
    console.log('calling listenForSignature');
    setAllSigned(await listenForSignature(job.jobId));
    setIsSigned(false);
    //to do error handling modal for user
  }
  return (
    <Container styles={{ justifyContent: 'center' }}>
      {allSigned ? (
        <LottieView
          source={require('../../common/assets/animations/success.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.navigate('Jobs')}
        />
      ) : isSigned ? (
        <Container styles={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', flex: 1 }}>
          <View style={{ height: '35%', width: '70%' }}>
            <LottieView
              style={{}}
              source={require('../../common/assets/animations/signing.json')}
              autoPlay
              loop={true}
            />
          </View>
          <StyledText style={{ marginBottom: '30%' }} isDarkMode={isDarkMode}>
            waiting for the other party to sign...
          </StyledText>
        </Container>
      ) : isLoading ? (
        <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
      ) : (
        <>
          <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700, fontSize: 17 }}>
            {heading}
          </StyledText>
          <View style={{ marginTop: '20%' }}>
            <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700 }}>
              Receiver's Address:
            </StyledText>
          </View>
          <StyledText isDarkMode={isDarkMode}>{job?.parcelData.endName}</StyledText>
          <View style={{ marginTop: 50 }}>
            <Button isDarkMode={isDarkMode} backgroundColor={LightTheme.accent} onPress={onPress}>
              <ButtonText>Sign</ButtonText>
            </Button>
          </View>
        </>
      )}
    </Container>
  );
};

export default SignatureScreen;
