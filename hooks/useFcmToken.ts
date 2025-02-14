import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';

export const useFcmToken = (): [
    string,
    React.Dispatch<React.SetStateAction<string>>,
] => {
    const [fcmToken, setFcmToken] = useState<string>('');

    useEffect(() => {
        (async () => {
            const tempFcmToken = await messaging().getToken();

            if (tempFcmToken) {
                setFcmToken(tempFcmToken);
            }
        })();
    }, []);

    return [fcmToken, setFcmToken];
};
