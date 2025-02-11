import { Button } from '@/components/atoms/Button';
import { ButtonSize, ButtonVariant } from '@/components/atoms/Button/index.type';
import { VStack } from '@/components/atoms/VStack';
import { Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ padding: 20 }}>
            <VStack>
                <Button variant={ButtonVariant.SUCCESS} onPress={() => {}}>
                    <Text>저장s하기</Text>
                </Button>
                <Text style={{fontFamily: 'PretendardBold'}}>저장s하기</Text>
                <Text>저장s하기</Text>
            </VStack>
        </SafeAreaView>
    );
}
