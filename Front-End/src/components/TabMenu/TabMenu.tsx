import { Icon, Menu, Portal } from "@chakra-ui/react";
import EditTabDialog from "../popover/EditTabDialog";
import { Tab } from "../Tabs/classTab";
import DeleteTabDialog from "../popover/DeleteTabDialog";
import { MdMoreHoriz } from "react-icons/md";

interface Iprops {
  tab: Tab,
}

export const TabMenu = ({ tab }: Iprops) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Icon>
          <MdMoreHoriz />
        </Icon>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg='#343E48' p='10px'>

            <EditTabDialog tabe={tab}>
              <Menu.Item p='10px' value="edit0" closeOnSelect={false}>
                Editar Aba
              </Menu.Item>
            </EditTabDialog>

            <DeleteTabDialog tabToRemove={tab}>
              <Menu.Item p='10px' value="edit1" closeOnSelect={false}>
                Deletar Aba
              </Menu.Item>
            </DeleteTabDialog>

          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default TabMenu;
