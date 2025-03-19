import { Heading, Flex} from '@chakra-ui/react';
import Tabes from "../../components/Tabs/Tabs.js";
import TskBar from "../../components/TaskBar/TskBar.js";
import Footer from '../../components/Footer/Footer.js';

const Home = () => {
  
  return (
    <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} mt={"2em"} mb={"2em"} w={"100%"} h={"100%"} className="home">
      <Heading size={"4xl"}>Minha lista de tarefas</Heading>
       <TskBar/>
      {/*<Tabes/>*/}
      <Footer/> 
    </Flex>
  );
};

export default Home;
