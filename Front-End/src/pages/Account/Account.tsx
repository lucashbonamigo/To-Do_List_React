import { Flex,  Image } from "@chakra-ui/react";
import LoginInput from "../../components/LoginInput/LoginInput";
import Header from "../../components/Header/Header";

export const AccountPage = () => {
  return (
    <>
      <Header />

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="gray.100"
        p={4}
      >
        <Flex
          bg="white"
          borderRadius="2xl"
          boxShadow="lg"
          overflow="hidden"
          maxW="900px"
          w="100%"
        >
          {/* Imagem */}
          <Image
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
            alt="Account"
            objectFit="cover"
            w="50%"
            display={{ base: "none", md: "block" }}
          />

          <Flex
            direction="column"
            justify="center"
            p={8}
            w={{ base: "100%", md: "50%" }}
            gap={4}
          >
            <LoginInput
              labelInput={"Change User"}
              value={undefined}
              onChange={(e: any) => {}}
              type={"text"}
            />

            <LoginInput
              labelInput={"Change Password"}
              value={undefined}
              onChange={(e: any) => {}}
              type={"password"}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default AccountPage;