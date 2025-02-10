import { Button } from '@/components/atoms/Button';
import { ButtonVariant } from '@/components/atoms/Button/index.type';
import { VStack } from '@/components/atoms/VStack';
import { Text, SafeAreaView } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ padding: 20 }}>
            <VStack>
                <Button variant={ButtonVariant.WARNING} onPress={() => {}}>
                    <Text>저장하기</Text>
                </Button>
            </VStack>
        </SafeAreaView>
    );
}
