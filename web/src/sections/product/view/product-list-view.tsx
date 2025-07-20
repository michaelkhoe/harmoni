'use client';

import type { Theme, SxProps } from '@mui/material/styles';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { IProductItem, IProductTableFilters } from 'src/types/product';
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

  import { DashboardContent } from 'src/layouts/dashboard';
  import { useGetProducts, productMockAPI } from 'src/actions/product-mock';

import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { EmptyContent } from 'src/components/empty-content';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { id: false };

const HIDE_COLUMNS_TOGGLABLE = ['id'];

// ----------------------------------------------------------------------

export function ProductListView() {
  const confirmDialog = useBoolean();

  const { products, productsLoading } = useGetProducts();

  const [tableData, setTableData] = useState<IProductItem[]>(products);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);
  const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

  const filters = useSetState<IProductTableFilters>({ publish: [], stock: [], category: [] });
  const { state: currentFilters } = filters;

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(HIDE_COLUMNS);

  useEffect(() => {
    const currentProducts = productMockAPI.getAll();
    setTableData(currentProducts);
  }, [refreshKey]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const canReset = currentFilters.publish.length > 0 || currentFilters.stock.length > 0 || currentFilters.category.length > 0;

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: currentFilters,
  });

  const handleDeleteRow = useCallback(
    (id: string) => {
      const success = productMockAPI.delete(id);
      
      if (success) {
        handleRefresh();
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    },
    [handleRefresh]
  );

  const handleDeleteRows = useCallback(() => {
    const deletedCount = productMockAPI.deleteMany(selectedRowIds as string[]);
    
    if (deletedCount > 0) {
      handleRefresh();
      setSelectedRowIds([]);
      toast.success(`${deletedCount} products deleted successfully!`);
    } else {
      toast.error('Failed to delete products');
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
      field: 'coverUrl',
      headerName: 'Image',
      width: 80,
      hideable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box sx={{ p: 1 }}>
          <Image
            src={params.row.coverUrl}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              objectFit: 'cover',
            }}
          />
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 240,
      hideable: false,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          href={paths.dashboard.product.details(params.row.id)}
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
      field: 'category',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => (
        <Box sx={{ color: 'text.secondary' }}>
          {params.row.category || 'Uncategorized'}
        </Box>
      ),
    },
    {
      field: 'costPrice',
      headerName: 'Cost Price',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
          ${params.row.costPrice?.toFixed(2) || '0.00'}
        </Box>
      ),
    },
    {
      field: 'salePrice',
      headerName: 'Sale Price',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 'medium', color: 'primary.main' }}>
          ${params.row.salePrice?.toFixed(2) || '0.00'}
        </Box>
      ),
    },
    {
      field: 'profit',
      headerName: 'Profit',
      width: 100,
      renderCell: (params) => {
        const profit = (params.row.salePrice || 0) - (params.row.costPrice || 0);
        return (
          <Box sx={{ 
            fontWeight: 'medium',
            color: profit > 0 ? 'success.main' : 'error.main'
          }}>
            ${profit.toFixed(2)}
          </Box>
        );
      },
    },
    {
      field: 'available',
      headerName: 'Stock',
      width: 110,
      renderCell: (params) => (
        <Box
          sx={{
            color: params.row.available > 10 ? 'success.main' : 
                   params.row.available > 0 ? 'warning.main' : 'error.main',
            fontWeight: 'medium',
          }}
        >
          {params.row.available || 0}
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
      field: 'createdAt',
      headerName: 'Created At',
      type: 'dateTime',
      width: 180,
      valueGetter: (params) => params.row?.createdAt ? new Date(params.row.createdAt) : null,
      renderCell: (params) => params.row?.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : '-',
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
            { name: 'Product', href: paths.dashboard.product.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
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
            loading={productsLoading}
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
  filters: UseSetStateReturn<IProductTableFilters>;
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
  inputData: IProductItem[];
  filters: IProductTableFilters;
};

function applyFilter({ inputData, filters }: ApplyFilterProps) {
  const { publish, stock, category } = filters;

  let filteredData = inputData;

  // Filter by publish status
  if (publish.length) {
    filteredData = filteredData.filter((product) => publish.includes(product.publish));
  }

  // Filter by stock status
  if (stock.length) {
    filteredData = filteredData.filter((product) => {
      if (stock.includes('in_stock')) {
        return product.available > 0;
      }
      if (stock.includes('low_stock')) {
        return product.available > 0 && product.available <= 10;
      }
      if (stock.includes('out_of_stock')) {
        return product.available === 0;
      }
      return true;
    });
  }

  // Filter by category
  if (category.length) {
    filteredData = filteredData.filter((product) => category.includes(product.category));
  }

  return filteredData;
}
