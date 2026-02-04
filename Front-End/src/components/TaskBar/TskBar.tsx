import {
  Button,
  Flex,
  IconButton,
  Collapsible,
  Box
} from '@chakra-ui/react'
import { Task } from './ClassTask'
import { useContext, useRef, useState } from 'react'
import LoginInput from '../LoginInput/LoginInput'
import { MdAddTask, MdMoreVert } from 'react-icons/md'
import { TaskContext } from '../../context/TaskContext'
import { TabContext } from '../../context/TabContext'

const TskBar = () => {
  const [novaTarefa, setNovaTarefa] = useState('')
  const [deadline, setDeadline] = useState<Date>()
  const [repetitions, setRepetitions] = useState<number>()
  const [estimedTime, setEstmedTime] = useState<number>()

  const ref = useRef<HTMLInputElement>(null)
  const { addTask } = useContext(TaskContext)
  const { selectedTab } = useContext(TabContext)

  const insertTask = () => {
    if (!novaTarefa.trim()) return

    const task = new Task(
      novaTarefa,
      0,
      selectedTab,
      deadline,
      repetitions,
      estimedTime
    )

    addTask(task)
    setNovaTarefa('')
    ref.current?.focus()
  }

  return (
    <Collapsible.Root>
      <Flex direction="column" w={{ base: '100%', sm: '400px' }} gap={2}>
        <Flex gap={2} align="flex-end">
          <LoginInput
            labelInput="Tarefa"
            width="100%"
            onChange={setNovaTarefa}
            type="Text"
            value={novaTarefa}
          />

          <Collapsible.Trigger>
            <IconButton
              aria-label="Mais opções"
              icon={<MdMoreVert />}
              variant="outline"
              size="md"
            />
          </Collapsible.Trigger>

          <Button
            onClick={insertTask}
            disabled={!novaTarefa.trim()}
            bg="lightgreen"
            px={4}
          >
            <MdAddTask />
          </Button>
        </Flex>

        <Collapsible.Content>
          <Box
            mt={2}
            p={3}
          >
            <Flex
              gap={3}
              direction={{ base: 'column', sm: 'row' }}
              align="flex-end"
            >
              <LoginInput
                labelInput="Horas"
                width={{ base: '100%', sm: '80px' }}
                onChange={setEstmedTime}
                type="Number"
                value={estimedTime}
              />

              <LoginInput
                labelInput="Repetições"
                width={{ base: '100%', sm: '80px' }}
                onChange={setRepetitions}
                type="Number"
                value={repetitions}
              />

              <LoginInput
                labelInput="Data limite"
                width={{ base: '100%', sm: '150px' }}
                onChange={setDeadline}
                type="Date"
                value={deadline}
              />
            </Flex>
          </Box>
        </Collapsible.Content>
      </Flex>
    </Collapsible.Root>
  )
}

export default TskBar
