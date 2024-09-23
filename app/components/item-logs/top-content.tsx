import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  SharedSelection,
} from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "../icons/search-icon";
import { ChevronDownIcon } from "../icons/chevron-down-icon";
import { capitalize } from "../services/utils";
import { PlusIcon } from "../icons/plus-icon";

interface TopContentProps {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  visibleColumns: Selection;
  setVisibleColumns: ((keys: SharedSelection) => void) | undefined;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  itemLogs: any[];
  columns: any[];
  statusFilter: Selection;
  hasSearchFilter: boolean;
}

export const TopContent = ({
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
}: TopContentProps) => {
  return React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {itemLogs.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    itemLogs.length,
    hasSearchFilter,
  ]);
};
