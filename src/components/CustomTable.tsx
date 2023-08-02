import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

type CustomTableProps<T extends Record<string, any>> = {
  data: T[];
  columns: TableColumn<T>[];
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onArchive?: (id: number) => void;
};

interface TableColumn<T extends Record<string, any>> {
  id: keyof T;
  label: string;
}

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  onDelete,
  onEdit,
  onArchive,
}: CustomTableProps<T>) {
  const hasActionsColumn =
    onDelete !== undefined && onEdit !== undefined && onArchive !== undefined;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id.toString()}>{column.label}</TableCell>
            ))}
            {hasActionsColumn && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.id} sx={{ textAlign: 'center' }}>
                {columns.map((column) => (
                  <TableCell key={column.id.toString()}>
                    {String(row[column.id])}
                  </TableCell>
                ))}
                <TableCell>
                  {onDelete && (
                    <IconButton
                      onClick={() => onDelete(row.id as number)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {onEdit && (
                    <IconButton
                      onClick={() => onEdit(row.id as number)}
                      aria-label="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {onArchive && (
                    <IconButton
                      onClick={() => onArchive(row.id as number)}
                      aria-label="Archive"
                    >
                      <ArchiveIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
