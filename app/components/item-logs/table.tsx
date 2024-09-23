import React, { ReactNode } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { columns } from "public/data";
import { VerticalDotsIcon } from "../icons/vertical-dots-icon";
import { SearchIcon } from "../icons/search-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { capitalize, currencyFormatterr } from "../services/utils";
import { PlusIcon } from "../icons/plus-icon";
import { ItemLog, TransactionStatus } from "../services/item-logs.service";
import { TopContent } from "./top-content";
const INITIAL_VISIBLE_COLUMNS = [
  "item_name",
  "final_price",
  "is_sold",
  "members",
  "owner",
  "price",
  "price_per_person",
  "tax",
  "transaction_status",
  "actions",
];

export default function ItemLogsTable({ itemLogs }: { itemLogs: ItemLog[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredlogs = [...itemLogs];
    return filteredlogs;
  }, [itemLogs, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ItemLog, b: ItemLog) => {
      const first = a[sortDescriptor.column as keyof ItemLog] as number;
      const second = b[sortDescriptor.column as keyof ItemLog] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (item: ItemLog, columnKey: React.Key): ReactNode => {
      const cellValue = item[columnKey as keyof ItemLog];

      switch (columnKey) {
        case "final_price":
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {currencyFormatterr(cellValue as number)}
              </span>
            </div>
          );
        case "price":
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {currencyFormatterr(cellValue as number)}
              </span>
            </div>
          );
        case "price_per_person":
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {currencyFormatterr(cellValue as number)}
              </span>
            </div>
          );
        case "tax":
          return (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {currencyFormatterr(cellValue as number)}
              </span>
            </div>
          );
        case "transaction_status":
          const transactionStatus: TransactionStatus[] =
            cellValue as TransactionStatus[];
          if (transactionStatus && transactionStatus.length) {
            return transactionStatus.map((status) => {
              return (
                <Chip
                  key={status.member}
                  color={status.is_paid ? "success" : "danger"}
                  variant="flat"
                >
                  {status.member}
                </Chip>
              );
            });
          } else "";
        case "is_sold":
          // return chip with yes and no
          return (
            <Chip
              color={cellValue ? "success" : "danger"}
              variant="flat"
              className="capitalize"
            >
              {cellValue ? "yes" : "no"}
            </Chip>
          );
        case "members":
          return (cellValue as string[]).join(", ");
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          if (cellValue instanceof Array) {
            return "";
          } else {
            return cellValue;
          }
      }
    },
    []
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = TopContent({
    filterValue,
    onClear,
    onSearchChange,
    visibleColumns,
    setVisibleColumns,
    onRowsPerPageChange,
    itemLogs,
    columns,
    statusFilter,
    hasSearchFilter,
  });

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
