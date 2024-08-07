import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, ButtonText, StyledText } from '@/components/common/StyledComponents';
import { DarkTheme, LightTheme } from '@/constants/Colors';
import LottieView from 'lottie-react-native';
import { useMainContext } from '@/providers/main.provider';
// import { assignDriverToJobId } from '../../dapp-connectors/dapp-controller';
import Loader from '@/components/common/loader';
import { router } from 'expo-router';
import { assignDriverToJobId } from '@/dapp-connectors/dapp-controller';
import { Journey } from '@/constants/Types';

const AssignDriverScreen = (journey:Journey ) => {
    const { universalLink, deepLink, wcURI, setRefetchDataFromAPI, isDarkMode } = useMainContext();
    const [isAssigned, setIsAssigned] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const backgroundColor = isDarkMode ? DarkTheme.background2 : LightTheme.background2;

    const acceptJob = async () => {
        setIsLoading(true);
        try {
            // navigateDeepLink(universalLink, deepLink, wcURI);
            await assignDriverToJobId(journey.journeyId);
            setIsAssigned(true);
            setRefetchDataFromAPI(true);
        } catch (error) {
            setIsError(true);
            setErrorMessage('Error assigning driver to journey');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container styles={{ justifyContent: 'center', backgroundColor }}>
            {isAssigned ? (
                <LottieView
                    source={require('@/assets/animations/success.json')}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() => router.push({ pathname: '/jobs' })}
                />
            ) : isLoading ? (
                <Loader isLoading={isLoading} isError={isError} setIsError={setIsError} errorText={errorMessage} />
            ) : (
                <>
                    <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700, fontSize: 17 }}>
                        Do you want to accept this journey?
                    </StyledText>
                    <View style={{ marginTop: '20%' }}>
                        <StyledText isDarkMode={isDarkMode} style={{ fontWeight: 700 }}>
                            Receiver's Address
                        </StyledText>
                    </View>
                    {/* <StyledText isDarkMode={isDarkMode}>{journey?.parcelData.endName}</StyledText> */}
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
