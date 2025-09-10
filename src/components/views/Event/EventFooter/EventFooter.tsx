import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import React, { FC } from "react";

interface EventFooterProps {
  total?: number;
  totalPages: number;
}

const EventFooter: FC<EventFooterProps> = ({ total, totalPages }) => {
  const { handleChangeLimit, handleChangePage, currentLimit, currentPage } =
    useChangeUrl();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2 lg:flex-row lg:justify-between">
      <Select
        className="max-w-28"
        size="md"
        selectedKeys={[`${currentLimit}`]}
        selectionMode="single"
        onChange={handleChangeLimit}
        startContent={<p className="text-sm">Show:</p>}
        disallowEmptySelection
      >
        {LIMIT_LISTS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
      {totalPages > 1 && (
        <Pagination
          loop
          isCompact
          showControls
          total={totalPages}
          page={Number(currentPage)}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default EventFooter;
