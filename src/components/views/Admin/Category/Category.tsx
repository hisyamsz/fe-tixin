import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORIES } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  const { push, isReady, query } = useRouter();

  const {
    currentLimit,
    currentPage,
    dataCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    setURL,
    selectedId,
    setSelectedId,
  } = useCategory();

  const disclosureAddCategoryModal = useDisclosure();
  const disclosureDeleteCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category-button"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${category._id}`);
                    disclosureDeleteCategoryModal.onOpen();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LIST_CATEGORIES}
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={disclosureAddCategoryModal.onOpen}
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPage}
        />
      )}
      <AddCategoryModal
        {...disclosureAddCategoryModal}
        refetchCategory={refetchCategory}
      />
      <DeleteCategoryModal
        {...disclosureDeleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
