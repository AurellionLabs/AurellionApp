import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, ButtonText, BoldText, StyledText } from '../../common/components/StyledComponents';
import { DarkTheme, LightTheme } from '../../common/constants/Colors';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AssignDriverScreenNavigationProp, SignatureScreenRouteProp } from '../../navigation/types';
import { useMainContext } from '../main.provider';
import { assignDriverToJobId } from '../../dapp-connectors/dapp-controller';
import { navigateDeepLink } from '../../utils/ExplorerUtils';
import Loader from '../../common/loader/loader';

const AssignDriverScreen = () => {
  const navigation = useNavigation<AssignDriverScreenNavigationProp>();
  const { universalLink, deepLink, wcURI, setRefetchDataFromAPI, isDarkMode } = useMainContext();
  const route = useRoute<SignatureScreenRouteProp>();
  const { job } = route.params;
  const [isAssigned, setIsAssigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;

  const acceptJob = async () => {
    setIsLoading(true);
    try {
      navigateDeepLink(universalLink, deepLink, wcURI);
      await assignDriverToJobId(job.jobId);
      setIsAssigned(true);
      setRefetchDataFromAPI(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Error assigning driver to job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container styles={{ justifyContent: 'center', backgroundColor }}>
      {isAssigned ? (
        <LottieView
          source={require('../../common/assets/animations/success.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() =>
            navigation.navigate('Signature', {
              heading: 'Sign to confirm pacakge received from customer',
              job: job,
            })
          }
        />
      ) : isLoading ? (
        <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
      ) : (
        <>
          <StyledText isDarkMode style={{ fontWeight: 700, fontSize: 17 }}>
            Do you want to accept this job?
          </StyledText>
          <View style={{ marginTop: '20%' }}>
            <StyledText isDarkMode style={{ fontWeight: 700 }}>
              Receiver's Address
            </StyledText>
          </View>
          <StyledText isDarkMode>{job?.parcelData.endName}</StyledText>
          <View style={{ marginTop: 50 }}>
            <Button isDarkMode={isDarkMode} backgroundColor={LightTheme.accent} onPress={acceptJob}>
              <ButtonText>Accept Job</ButtonText>
            </Button>
          </View>
        </>
      )}
    </Container>
  );
};

export default AssignDriverScreen;
