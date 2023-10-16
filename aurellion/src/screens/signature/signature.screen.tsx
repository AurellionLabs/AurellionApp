import React, { useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { Container, Button, ButtonText, BoldText } from '../../common/components/StyledComponents';
import { LightTheme } from '../../common/constants/Colors';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { JobsScreenNavigationProp, SignatureScreenRouteProp } from '../../navigation/types';
import { useMainContext } from '../main.provider';
import { customerPackageSign, driverPackageSign } from '../../dapp-connectors/dapp-controller';
import { navigateDeepLink } from '../../utils/ExplorerUtils';
import Loader from '../../common/loader/loader';

const SignatureScreen = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const { universalLink, deepLink, wcURI, userType, setRefetchDataFromAPI } = useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { heading, job } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onPress = async () => {
    setIsLoading(true);
    try {
      navigateDeepLink(universalLink, deepLink, wcURI);
      if (userType === 'customer') {
        await customerPackageSign(job.jobId);
      } else if (userType === 'driver') {
        await driverPackageSign(job.jobId);
      }
      setIsSigned(true);
      setRefetchDataFromAPI(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error Signing off Package');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container styles={{ justifyContent: 'center' }}>
      {isSigned ? (
        <LottieView
          source={require('../../common/assets/animations/success.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => navigation.navigate('Jobs')}
        />
      ) : isLoading ? (
        <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
      ) : (
        <>
          <BoldText>{heading}</BoldText>
          <BoldText>Receiver's Address</BoldText>
          <BoldText>{job?.parcelData.endName}</BoldText>
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
