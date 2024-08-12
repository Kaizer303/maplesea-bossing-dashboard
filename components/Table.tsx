import { Fragment } from "preact";
import { useState } from "preact/hooks";
import { Modal } from "./Modal.tsx";

interface RowData {
  name: string;
  job: string;
  favoriteColor: string;
  isEditing: boolean;
}

interface TableProps {
  rows: RowData[];
  onNameChange: (index: number, newName: string) => void;
  onJobChange: (index: number, newJob: string) => void;
  onFavoriteColorChange: (index: number, newColor: string) => void;
  onEdit: (index: number) => void;
  onSave: (index: number) => void;
  onDelete: (index: number) => void;
  onAddNewRow: () => void;
  errors: boolean[][];
}

// Table Component
export function Table({
  rows,
  onNameChange,
  onJobChange,
  onFavoriteColorChange,
  onEdit,
  onSave,
  onDelete,
  onAddNewRow,
  errors,
}: TableProps) {
  return (
    <div class="w-3/4 mx-auto overflow-x-auto rounded-box">
      <table class="table table-lg">
        <thead class="border-b-0 bg-base-200">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              index={index + 1}
              {...row}
              onNameChange={(newName) => onNameChange(index, newName)}
              onJobChange={(newJob) => onJobChange(index, newJob)}
              onFavoriteColorChange={(newColor) =>
                onFavoriteColorChange(index, newColor)}
              onEdit={() => onEdit(index)}
              onSave={() => onSave(index)}
              onDelete={() => onDelete(index)}
              errors={errors[index] || []}
            />
          ))}
        </tbody>
      </table>
      <div class="flex justify-center my-4">
        <button class="btn btn-primary" onClick={onAddNewRow}>
          Add +
        </button>
      </div>
    </div>
  );
}

// TableRow Component
interface TableRowProps {
  index: number;
  name: string;
  job: string;
  favoriteColor: string;
  isEditing: boolean;
  onNameChange: (newName: string) => void;
  onJobChange: (newJob: string) => void;
  onFavoriteColorChange: (newColor: string) => void;
  onEdit: () => void;
  onSave: (index: number) => void;
  onDelete: () => void;
  errors: boolean[];
}

const TableRow = ({
  index,
  name,
  job,
  favoriteColor,
  isEditing,
  onNameChange,
  onJobChange,
  onFavoriteColorChange,
  onEdit,
  onSave,
  onDelete,
  errors,
}: TableRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <tr class="hover">
        <th>{index}</th>
        <td class="w-60">
          {isEditing
            ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    onNameChange((e.target as HTMLInputElement).value)}
                  class={`input input-bordered input-sm w-full ${
                    errors[0] ? "input-error" : ""
                  }`}
                  placeholder="Enter name"
                />
                {errors[0] && (
                  <span class="text-red-500 text-xs">Name is required</span>
                )}
              </div>
            )
            : <span>{name}</span>}
        </td>
        <td>
          {isEditing
            ? (
              <div>
                <input
                  type="text"
                  value={job}
                  onChange={(e) =>
                    onJobChange((e.target as HTMLInputElement).value)}
                  class={`input input-bordered input-sm w-full ${
                    errors[1] ? "input-error" : ""
                  }`}
                  placeholder="Enter job"
                />
                {errors[1] && (
                  <span class="text-red-500 text-xs">Job is required</span>
                )}
              </div>
            )
            : <span>{job}</span>}
        </td>
        <td>
          {isEditing
            ? (
              <div>
                <input
                  type="text"
                  value={favoriteColor}
                  onChange={(e) =>
                    onFavoriteColorChange((e.target as HTMLInputElement).value)}
                  class={`input input-bordered input-sm w-full ${
                    errors[2] ? "input-error" : ""
                  }`}
                  placeholder="Enter favorite color"
                />
                {errors[2] && (
                  <span class="text-red-500 text-xs">
                    Favorite color is required
                  </span>
                )}
              </div>
            )
            : <span>{favoriteColor}</span>}
        </td>
        <td class="w-22 text-center">
          <div class="flex gap-2 justify-end">
            {isEditing
              ? (
                <button
                  class="btn btn-sm"
                  onClick={() => onSave(index)}
                >
                  Save
                </button>
              )
              : <button class="btn btn-sm" onClick={onEdit}>Edit</button>}
            <button
              class="btn btn-sm btn-error"
              onClick={() => setIsModalOpen(true)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onDelete();
          setIsModalOpen(false);
        }}
        title="Delete Row"
        message="Are you sure you want to delete this row? This action cannot be undone."
      />
    </Fragment>
  );
};
