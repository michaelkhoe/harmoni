'use client';

import type { Theme, SxProps } from '@mui/material/styles';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { ICategoryItem, ICategoryTableFilters } from 'src/types/category';
import type {
  GridColDef,
  GridSlotProps,
  GridRowSelectionModel,
  GridActionsCellItemProps,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useBoolean, useSetState } from 'minimal-shared/hooks';
import { useState, useEffect, forwardRef, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCategories, categoryMockAPI } from 'src/actions/category-mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { id: false };

const HIDE_COLUMNS_TOGGLABLE = ['id', 'actions'];

// ----------------------------------------------------------------------

export function CategoryListView() {
  const confirmDialog = useBoolean();

  const { categories, categoriesLoading } = useGetCategories();

  const [tableData, setTableData] = useState<ICategoryItem[]>(categories);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const filters = useSetState<ICategoryTableFilters>({ publish: [] });
  const { state: currentFilters } = filters;

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    const currentCategories = categoryMockAPI.getAll();
    setTableData(currentCategories);
  }, [refreshKey]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const canReset = currentFilters.publish.length > 0;

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: currentFilters,
  });

  const handleDeleteRow = useCallback(
    (id: string) => {
      const success = categoryMockAPI.delete(id);
      
      if (success) {
        handleRefresh();
        toast.success('Category deleted successfully!');
      } else {
        toast.error('Failed to delete category');
      }
    },
    [handleRefresh]
  );

  const handleDeleteRows = useCallback(() => {
    const deletedCount = categoryMockAPI.deleteMany(selectedRowIds as string[]);
    
    if (deletedCount > 0) {
      handleRefresh();
      setSelectedRowIds([]);
      toast.success(`${deletedCount} categories deleted successfully!`);
    } else {
      toast.error('Failed to delete categories');
    }
  }, [selectedRowIds, handleRefresh]);

  const CustomToolbarCallback = useCallback(
    () => (
      <CustomToolbar
        filters={filters}
        canReset={canReset}
        selectedRowIds={selectedRowIds}
        setFilterButtonEl={setFilterButtonEl}
        filteredResults={dataFiltered.length}
        onOpenConfirmDeleteRows={confirmDialog.onTrue}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFilters, selectedRowIds]
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Category Name',
      flex: 1,
      minWidth: 240,
      hideable: false,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          href={paths.dashboard.category.details(params.row.id)}
          color="inherit"
          variant="subtitle2"
          underline="hover"
          sx={{ cursor: 'pointer' }}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ color: 'text.secondary' }}>
          {params.row.description?.substring(0, 100)}
          {params.row.description?.length > 100 && '...'}
        </Box>
      ),
    },
    {
      field: 'publish',
      headerName: 'Publish',
      width: 110,
      type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.row.publish === 'published' ? 'success.main' : 'warning.main',
            fontWeight: 'medium',
          }}
        >
          {params.row.publish}
        </Box>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.row.isActive ? 'success.main' : 'error.main',
            fontWeight: 'medium',
          }}
        >
          {params.row.isActive ? 'Active' : 'Inactive'}
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      type: 'dateTime',
      width: 180,
      valueGetter: (params) => params.row?.createdAt ? new Date(params.row.createdAt) : null,
      renderCell: (params) => params.row?.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : '-',
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      type: 'dateTime',
      width: 180,
      valueGetter: (params) => params.row?.updatedAt ? new Date(params.row.updatedAt) : null,
      renderCell: (params) => params.row?.updatedAt ? new Date(params.row.updatedAt).toLocaleDateString() : '-',
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => {
            // Navigate to view
          }}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => {
            // Navigate to edit
          }}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Category', href: paths.dashboard.category.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.category.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New category
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            minHeight: 640,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: '1px' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={categoriesLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 20, { value: -1, label: 'All' }]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: CustomToolbarCallback,
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              toolbar: { setFilterButtonEl },
              panel: { anchorEl: filterButtonEl },
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmDialog.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

type CustomToolbarProps = {
  canReset: boolean;
  filteredResults: number;
  selectedRowIds: GridRowSelectionModel;
  onOpenConfirmDeleteRows: () => void;
  filters: UseSetStateReturn<ICategoryTableFilters>;
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
};

const CustomToolbar = forwardRef<HTMLDivElement, CustomToolbarProps>(
  ({ filters, canReset, selectedRowIds, filteredResults, onOpenConfirmDeleteRows, setFilterButtonEl }, ref) => (
    <GridToolbarContainer ref={ref}>
      <GridToolbarQuickFilter />

      <Box sx={{ flexGrow: 1 }} />

      {!!selectedRowIds.length && (
        <Button
          size="small"
          color="error"
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          onClick={onOpenConfirmDeleteRows}
        >
          Delete ({selectedRowIds.length})
        </Button>
      )}

      <GridToolbarColumnsButton />
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
);

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ICategoryItem[];
  filters: ICategoryTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps): ICategoryItem[] {
  const { publish } = filters;

  if (publish.length) {
    inputData = inputData.filter((category) => publish.includes(category.publish));
  }

  return inputData;
} 