import { LIMIT_LISTS } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ChangeEvent, FC, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface DataTableProps {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading: boolean;
  onClickButtonTopContent: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  totalPages: number;
}

const DataTable: FC<DataTableProps> = ({
  buttonTopContentLabel,
  columns,
  data,
  emptyContent,
  isLoading,
  onClickButtonTopContent,
  renderCell,
  totalPages,
}) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
  } = useChangeUrl();

  const TopContent = useMemo(() => {
    return (
      <div className="mb-2 flex flex-col-reverse justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          variant="flat"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={handleClearSearch}
          onChange={handleSearch}
          className="w-full lg:max-w-64"
        />
        {buttonTopContentLabel && (
          <Button
            className="bg-primary text-white"
            onPress={onClickButtonTopContent}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleSearch,
    handleClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center p-2 lg:justify-between">
        <Select
          className="hidden max-w-32 lg:block"
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
  }, [
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={data}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-400/30 backdrop-blur-sm">
            <Spinner className="text-primary" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
