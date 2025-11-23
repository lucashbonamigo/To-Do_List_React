import { useContext } from 'react'
import { Flex, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { Task } from '../TaskBar/ClassTask.js'
import { Tab } from './classTab.js'
import AddTabDialog from '../popover/AddTabDialog.js';
import Item from '../Item/item';
import { TaskContext } from '../../context/TaskContext.js';
import { TabContext } from '../../context/TabContext.js';
import TabMenu from '../TabMenu/TabMenu.js';

const Tabes = () => {
  const { allTasks: tarefas } = useContext(TaskContext);
  const { tabs, setSelectedTab, selectedTab } = useContext(TabContext);

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      w={{ base: "200px", sm: "400px", md: "700px", lg: "900px" }}
      onValueChange={(e: React.InputHTMLAttributes<InputEvent>) => {
        setSelectedTab(e.value);
      }}
      my='55px'
    >
      <Tabs.List
        bg='#343E48'
        borderRadius='full'
        flex="1 1 auto"
        overflowX="scroll"
        mt="10px"
        pt='2px'
        boxShadow='sm'
      >
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Trigger
            value={tab.id.toString()}
            borderRadius='full'
            key={tab.id}
            minW="content"
            mx='2px'
            textWrap='nowrap'
            color={selectedTab == tab.id.toString() ? '#343E48' : '#B5BDC8'}
            bg={selectedTab == tab.id.toString() ? '#B5BDC8' : '#343E48'}
          >
            {tab.name + " "}
            {selectedTab === tab.id.toString() ? <>
              
            <TabMenu tab={tab}/>
            </> : <></>}
          </Tabs.Trigger>
        ))}
        <AddTabDialog />
      </Tabs.List>

      <Tabs.ContentGroup>
        <Tabs.Content value={selectedTab}>
          {tabs?.length > 0 && (
            <>
              <Heading
                size="xl"
                my="6"
              >
                {tabs.find((t) => t.id.toString() === selectedTab)?.description}
              </Heading>
              <Flex direction={"column"}>
                {tarefas?.filter(task => task.tab_task.toString() === selectedTab).length > 0 ? (
                  <List.Root>
                    {tarefas
                      .filter(task => task.tab_task.toString() === selectedTab)
                      .map((task: Task) => (

                        <List.Item
                          key={task.id}
                          listStyle='none'
                          m='9px'
                        >
                          <Item
                            task={task}
                          />
                        </List.Item>

                      ))}
                  </List.Root>
                ) : (
                  <Text w='100vw' height='100vh' className="no-tasks">Nenhuma tarefa adicionada ainda.</Text>
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