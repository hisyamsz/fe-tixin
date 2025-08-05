import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { FC } from "react";
import { CiMenuKebab } from "react-icons/ci";

interface DropdownActionProps {
  onPressButtonDetail: () => void;
  onPressButtonDelete: () => void;
}

const DropdownAction: FC<DropdownActionProps> = ({
  onPressButtonDetail,
  onPressButtonDelete,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-event-button" onPress={onPressButtonDetail}>
          Detail
        </DropdownItem>
        <DropdownItem
          key="delete-event-button"
          className="text-danger-500"
          onPress={onPressButtonDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
