import { useContext } from 'react'
import { Flex, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { UserContext } from '../../hooks/UserContext.js';
import { Task } from '../TaskBar/ClassTask.js'
import { Tab } from './classTab.js'
import AddTabDialog from '../popover/AddTabDialog.js';
import DeleteTabDialog from '../popover/DeleteTabDialog.js';
import EditTabDialog from '../popover/EditTabDialog.js';
import Item from '../Item/item';

const Tabes = () => {
  const { tarefas, tabs, setSelectedTab, selectedTab, } = useContext(UserContext);
  // const [selectedTabs, setSelectedTab] = useState<string>(tabs && tabs[0]?.id.toString());

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      w={{ base: "200px", sm: "400px", md: "700px", lg: "900px" }}
      onValueChange={(e: any) => {
        setSelectedTab(e.value);
      }}
    >
      <Tabs.List flex="1 1 auto" overflowX={"scroll"} h={"80px"} mt={"10px"}>
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Trigger value={tab.id.toString()} key={tab.id} h={{ base: "60px" }} minW={"150px"} mx={"4px"}>
            {tab.name}{"  "}
            <EditTabDialog tabe={tab} />
            <DeleteTabDialog tabToRemove={tab} />
          </Tabs.Trigger>
        ))}
        <AddTabDialog />
      </Tabs.List>

      <Tabs.ContentGroup>
        <Tabs.Content value={selectedTab}>
          {tabs?.length > 0 && (
            <>
              <Heading size="xl" my="6">
                {tabs.find((t) => t.id.toString() === selectedTab)?.description}
              </Heading>
              <Flex direction={"column"}>
                {tarefas?.filter(task => task.tab_task.toString() === selectedTab).length > 0 ? (
                  <List.Root>
                    {tarefas
                      .filter(task => task.tab_task.toString() === selectedTab)
                      .map((task: Task) => (
                        <List.Item key={task.id} border={'1px solid white'} w={{ base: "250px", sm: "400px", md: "700px", lg: "900px" }} py={'.7em'} pl={'.3em'} mt={".5em"} display={"flex"} alignItems={"Center"}>
                          <Item task={task} />
                        </List.Item>
                      ))}
                  </List.Root>
                ) : (
                  <Text className="no-tasks">Nenhuma tarefa adicionada ainda.</Text>
                )}
              </Flex>
            </>
          )}
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
export default Tabes