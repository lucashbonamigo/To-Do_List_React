import { Avatar, Flex, Heading, Icon } from "@chakra-ui/react";
import { TfiAlignJustify, TfiBell } from "react-icons/tfi";

// const BiExit = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/Login';
//     window.location.reload();
// }

export const Header = () => {
    return (
        <>
            <Flex
                w='100vw'
                p='25px'
                bgColor='#343E48'
                justifyContent='center'
            >
                <Flex
                    w='100vw'
                    maxW="1500px"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading size="4xl" fontWeight={'bold'}>To-Do List</Heading>
                    <Flex 
                        w='150px' 
                        justify={'space-around'}
                        alignItems="center"
                    >
                        <Icon size="lg"><TfiBell /></Icon>
                        <Avatar.Root shape="full" size="lg">
                            <Avatar.Fallback name="Random User" />
                            <Avatar.Image src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
                        </Avatar.Root>
                        <Icon size="lg"><TfiAlignJustify /></Icon>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default Header;