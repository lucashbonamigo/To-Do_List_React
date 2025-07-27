import { Flex } from '@chakra-ui/react';
import Tabes from "../../components/Tabs/Tabs.js";
import TskBar from "../../components/TaskBar/TskBar.js";
import Footer from '../../components/Footer/Footer.js';
import Header from '../../components/Header/Header.js';

////const BiExit = () => {
//  localStorage.removeItem('LoginToDo');
//  localStorage.removeItem('id');
//  window.location.href = '/Login';
//  window.location.reload();
//}

const Home = () => {

  return (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} mt={"2em"} mb={"2em"} w={"100%"} h={"100%"} className="home">
      <Header/>
      <TskBar />
      <Tabes />
      <Footer />
    </Flex>
  );
};

export default Home;
