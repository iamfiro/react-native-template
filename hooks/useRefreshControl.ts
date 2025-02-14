import {useCallback, useState} from "react";
import {RefreshControlProps} from "react-native";

/**
 * 주어진 onRefresh 콜백 함수와 함께 리프레시 컨트롤을 제공하는 훅.
 *
 * @param {Object} options - 옵션 객체
 * @param {() => void} options.onRefresh - 리프레시 시 호출할 콜백 함수
 * @param {number} [options.timeout=2000] - 리프레시가 끝나기 전 대기할 시간 (기본값: 2000ms)
 * @returns {Object} 리프레시 컨트롤과 관련된 속성 및 상태 반환
 * @returns {boolean} returns.refreshing - 현재 리프레시 중인지 여부
 * @returns {RefreshControlProps} returns.refreshControlProps - ScrollView 또는 FlatList의 refreshControl에 전달할 속성들
 *
 * @example
 * const { refreshing, refreshControlProps } = useRefreshControl({
 *     onRefresh: () => {
 *         // 데이터 갱신 로직
 *     },
 *     timeout: 2000,
 * });
 *
 * return (
 *     <ScrollView refreshControl={<RefreshControl {...refreshControlProps} />}>
 *         서비스 코드
 *     </ScrollView>
 * );
 */

interface UseRefreshControlOptions {
    onRefresh: () => void;
    timeout?: number; // 타임아웃 시간 (기본값 2000ms)
}

function useRefreshControl({ onRefresh, timeout = 2000 }: UseRefreshControlOptions) {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        onRefresh();
        setTimeout(() => {
            setRefreshing(false);
        }, timeout);
    }, [onRefresh, timeout]);

    const refreshControlProps: RefreshControlProps = {
        refreshing,
        onRefresh: handleRefresh,
    };

    return { refreshing, refreshControlProps };
}

export default useRefreshControl;