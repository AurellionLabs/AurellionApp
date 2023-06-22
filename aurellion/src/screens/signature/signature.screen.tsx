import React, { useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { Container, Button, ButtonText, BoldText } from '../../common/components/StyledComponents';
import { LightTheme } from '../../common/constants/Colors';
import LottieView from "lottie-react-native";
import { useRoute } from '@react-navigation/native';
import { SignatureScreenRouteProp } from '../../navigation/types';

const SignatureScreen = () => {
    const route = useRoute<SignatureScreenRouteProp>();
    const { heading } = route.params;
    const isDarkMode = useColorScheme() === 'dark';
    const [isSigned, setIsSigned] = useState(false);

    const onPress = () => {
        setIsSigned(true);
    }

    return (
        <Container styles={{ justifyContent: 'center' }}>
            {isSigned ? (<LottieView source={require('../../common/assets/animations/success.json')} autoPlay loop={false} />) : (<>
                <BoldText>{heading}</BoldText>
                <View style={{ marginTop: 50 }}>
                    <Button isDarkMode={isDarkMode} backgroundColor={LightTheme.accent} onPress={onPress}>
                        <ButtonText>Sign</ButtonText>
                    </Button>
                </View>
            </>)}
        </Container>
    )
}

export default SignatureScreen;