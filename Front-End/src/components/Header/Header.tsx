import { Avatar, AvatarIcon, Flex, Heading, Icon } from "@chakra-ui/react";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BiExit = () => {
    localStorage.removeItem('token');
    window.location.href = '/Login';
    window.location.reload();
}

export const Header = () => {
    const navigate = useNavigate();
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
                    <Heading size="4xl" onClick={() =>(navigate('/'))} fontWeight={'bold'}>To-Do List</Heading>
                    <Flex
                        w='150px'
                        justify={'space-around'}
                        alignItems="center"
                    >
                        <Avatar.Root shape="full" size="lg" onClick={() => navigate('/account')}>
                            <AvatarIcon />
                        </Avatar.Root>
                        
                        <Icon size="lg" onClick={() => BiExit()}>
                            <IoExit />
                        </Icon>

                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default Header;