import { useState } from "preact/hooks";
import { Table } from "../components/Table.tsx";

interface RowData {
  name: string;
  job: string;
  favoriteColor: string;
  isEditing: boolean;
}

const initialRows: RowData[] = [
  {
    name: "Cy Ganderton",
    job: "Quality Control Specialist",
    favoriteColor: "Blue",
    isEditing: false,
  },
  {
    name: "Hart Hagerty",
    job: "Desktop Support Technician",
    favoriteColor: "Purple",
    isEditing: false,
  },
  {
    name: "Brice Swyre",
    job: "Tax Accountant",
    favoriteColor: "Red",
    isEditing: false,
  },
];

export default function InteractiveTable() {
  const [rows, setRows] = useState<RowData[]>(initialRows);
  const [errors, setErrors] = useState<boolean[][]>([]);

  const updateRow = (index: number, updatedFields: Partial<RowData>) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, ...updatedFields } : row)),
    );
  };

  const handleNameChange = (index: number, newName: string) =>
    updateRow(index, { name: newName });
  const handleJobChange = (index: number, newJob: string) =>
    updateRow(index, { job: newJob });
  const handleFavoriteColorChange = (index: number, newColor: string) =>
    updateRow(index, { favoriteColor: newColor });

  const toggleEdit = (index: number) =>
    updateRow(index, { isEditing: !rows[index].isEditing });
  const handleDelete = (index: number) =>
    setRows(rows.filter((_, i) => i !== index));

  const handleAddNewRow = () => {
    if (rows.some((row) => row.isEditing)) return;
    setRows([
      ...rows,
      { name: "", job: "", favoriteColor: "", isEditing: true },
    ]);
    setErrors([
      ...errors,
      [false, false, false],
    ]);
  };

  const handleSave = (index: number) => {
    const row = rows[index];
    const newErrors = [...errors];
    newErrors[index] = [
      !row.name,
      !row.job,
      !row.favoriteColor,
    ];
    setErrors(newErrors);

    if (row.name && row.job && row.favoriteColor) {
      handleNameChange(index, row.name);
      handleJobChange(index, row.job);
      handleFavoriteColorChange(index, row.favoriteColor);

      rows[index].isEditing = false;
      setRows([...rows]);
    }
  };

  return (
    <Table
      rows={rows}
      onNameChange={handleNameChange}
      onJobChange={handleJobChange}
      onFavoriteColorChange={handleFavoriteColorChange}
      onEdit={toggleEdit}
      onSave={(index) => handleSave(index)}
      onDelete={handleDelete}
      onAddNewRow={handleAddNewRow}
      errors={errors}
    />
  );
}
