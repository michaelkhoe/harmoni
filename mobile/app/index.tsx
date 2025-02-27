import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { useColorScheme } from "nativewind";

import { useRouter } from "@unitools/router";

import { midnightBlue, white } from "@/constants/Colors";

const SplashScreen = () => {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    return (
        <VStack
            className="w-full max-w-[440px] items-center h-full justify-center"
            space="lg"
            style={{ backgroundColor: midnightBlue }}
        >
            <Image
                source={require('@/assets/images/harmoni-logo.png')}
                alt="Logo"
                size="none"
                className="aspect-[320/208] w-full max-w-[320px]"
            />
            <VStack className="w-full" space="lg">
                <Button
                    className="w-full"
                    onPress={() => {
                        router.push("/auth/login");
                    }}
                    style={{ backgroundColor: white }}
                >
                    <ButtonText className="font-medium" style={{ color: midnightBlue, textAlign: 'center' }}>Log in</ButtonText>
                </Button>
            </VStack>
        </VStack>
    );
};

export default function SplashScreenLayout() {
    return (
        <VStack className="flex-1 justify-center items-center px-9" style={{ backgroundColor: midnightBlue }}>
            <SplashScreen />
        </VStack>
    );
};