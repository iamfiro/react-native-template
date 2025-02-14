/**
 * 미터 단위의 거리를 적절한 단위(km 또는 m)로 변환하여 문자열로 반환합니다.
 *
 * @param {number} meters - 변환할 거리 (미터 단위)
 * @returns {string} 변환된 거리 문자열 (예: "20.0km" 또는 "200m")
 *
 * @example
 * formatDistance(20000) // returns "20.0km"
 * formatDistance(200)   // returns "200m"
 * formatDistance(1500)  // returns "1.5km"
 * formatDistance(999)   // returns "999m"
 *
 * @throws {TypeError} meters가 숫자가 아닌 경우
 * @throws {Error} meters가 음수인 경우
 */
export function formatDistance(meters: number): string {
    // 입력값 유효성 검사
    if (typeof meters !== 'number') {
        throw new TypeError('입력값은 숫자여야 합니다');
    }

    if (meters < 0) {
        throw new Error('거리는 음수일 수 없습니다');
    }

    if (meters >= 1000) {
        return `${(meters / 1000).toFixed(1)}km`;
    } else {
        return `${meters}m`;
    }
}