import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from "@notifee/react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '@/api/axios';
import { API_URL } from '@env';

/**
 * FCM 관련 상수 값들을 정의합니다.
 */
const FCM_CONSTANTS = {
	TOKEN_SENT_KEY: '@fcm_token_sent',
	TOKEN_KEY: '@fcm_token',
	CHANNEL_ID: 'default',
	CHANNEL_NAME: 'Default Channel',
    API_PATH: '/notification/fcm/register',
} as const;

/**
 * FCM 알림 설정을 관리하는 유틸리티 함수
 *
 * @description
 * 1. FCM 권한을 요청하고 토큰을 받아옵니다.
 * 2. 토큰이 서버에 전송되지 않았다면 서버에 전송합니다.
 * 3. 토큰 업데이트 리스너를 설정합니다.
 * 4. Android용 알림 채널을 생성합니다.
 * 5. 포그라운드와 백그라운드 메시지 핸들러를 설정합니다.
 *
 * @throws {Error} FCM 권한이 거부되었거나 토큰 발급에 실패한 경우
 * @returns {Promise<() => void>} 구독 해제 함수들을 실행하는 cleanup 함수
 */
const setupNotifications = async () => {
	/**
	 * FCM 토큰을 서버에 등록하는 함수
	 * @param {string} token - FCM 토큰
	 * @returns {Promise<void>}
	 */
	const registerTokenToServer = async (token: string) => {
		try {
			const prevToken = await AsyncStorage.getItem(FCM_CONSTANTS.TOKEN_KEY);
			const tokenSent = await AsyncStorage.getItem(FCM_CONSTANTS.TOKEN_SENT_KEY);

			// 토큰이 변경되었거나 아직 서버에 전송되지 않은 경우에만 전송
			if (!tokenSent || prevToken !== token) {
				await client.post(FCM_CONSTANTS.API_PATH, {fcmToken: token});
				await AsyncStorage.setItem(FCM_CONSTANTS.TOKEN_SENT_KEY, 'true');
				await AsyncStorage.setItem(FCM_CONSTANTS.TOKEN_KEY, token);
				console.log('[FCM] 토큰이 서버에 성공적으로 등록되었습니다.');
			} else {
				console.log('[FCM] 토큰이 이미 서버에 등록되어 있습니다.');
			}
		} catch (error) {
			console.error('[FCM] 토큰 서버 등록 실패:', error);
			throw error;
		}
	};

	/**
	 * 알림을 표시하는 함수
	 * @param {FirebaseMessagingTypes.RemoteMessage} message - FCM 메시지
	 * @param {string} channelId - 알림 채널 ID
	 */
	const displayNotification = async (message: any, channelId: string) => {
		await notifee.displayNotification({
			title: message.notification?.title,
			body: message.notification?.body,
			android: {
				channelId,
				smallIcon: 'ic_launcher',
				importance: AndroidImportance.HIGH,
				sound: 'default',
				pressAction: {
					id: 'default',
				},
			},
		});
	};

	try {
		// FCM 권한 요청
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (!enabled) {
			console.log('[FCM] 사용자가 알림 권한을 거부했습니다.');
			return () => {
			};
		}

		// FCM 토큰 가져오기 및 서버 등록
		const token = await messaging().getToken();
		await registerTokenToServer(token);

		// 토큰 리프레시 리스너 설정
		const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
			console.log('[FCM] 토큰이 업데이트되었습니다:', newToken);
			try {
				await AsyncStorage.removeItem(FCM_CONSTANTS.TOKEN_SENT_KEY);
				await registerTokenToServer(newToken);
			} catch (error) {
				console.error('[FCM] 토큰 업데이트 중 오류 발생:', error);
			}
		});

		// 알림 채널 생성
		const channelId = await notifee.createChannel({
			id: FCM_CONSTANTS.CHANNEL_ID,
			name: FCM_CONSTANTS.CHANNEL_NAME,
			importance: AndroidImportance.HIGH,
			sound: 'default',
		});

		// 포그라운드 메시지 핸들러
		const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
			console.log('[FCM] 포그라운드 메시지 수신:', remoteMessage);
			await displayNotification(remoteMessage, channelId);
		});

		// 백그라운드 메시지 핸들러
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log('[FCM] 백그라운드 메시지 수신:', remoteMessage);
			await displayNotification(remoteMessage, channelId);
		});

		// 모든 구독 해제 함수를 하나로 묶어서 반환
		return () => {
			unsubscribeMessage();
			unsubscribeTokenRefresh();
		};
	} catch (error) {
		console.error('[FCM] 알림 설정 중 오류 발생:', error);
		throw error;
	}
};

export default setupNotifications;