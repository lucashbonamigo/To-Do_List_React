import { Flex } from '@chakra-ui/react';
import Tabes from "../../components/Tabs/Tabs.js";
import TskBar from "../../components/TaskBar/TskBar.js";
import Footer from '../../components/Footer/Footer.js';
import Header from '../../components/Header/Header.js';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      bg='#1F2630'
    >
      <Header />
      <TskBar />
      <Tabes />
      <Footer />
    </Flex>
  );
};

export default Home;
