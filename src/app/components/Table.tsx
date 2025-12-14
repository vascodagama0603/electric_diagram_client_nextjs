import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';

import React, { useState, useCallback, useEffect, } from 'react';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
const CloseIcon = (color: string) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);

import {
  TreeModalProps,
  TreeNode,
  DecisionSelectTableModalProps,
  PartsList
} from '../../lib/type'
import { ModalTableStyle } from '@/styles/GeneralStyles';
import {baseColors} from '../page_css'
import { flatNode } from './Logic';

const columnHelper = createMRTColumnHelper<PartsList>();

const columns = [
  columnHelper.accessor('maker', {
    header: 'メーカ名',
    size: 20,
  }),
  columnHelper.accessor('modelNumber', {
    header: '型式名',
    size: 200,
  }),
  columnHelper.accessor('amount', {
    header: '数量',
    size: 20,
  }),
  columnHelper.accessor('note', {
    header: '図記号',
    size: 200,
  }),
];

const csvConfig = mkConfig({
  filename:"PartsList",
  fieldSeparator: ',',
  decimalSeparator: '.',
  showColumnHeaders:true,
  columnHeaders:[
    {key:'maker',displayLabel:"メーカ名"},
    {key:'modelNumber',displayLabel:"型式名"},
    {key:'amount',displayLabel:"数量"},
    {key:'note',displayLabel:"図記号"},]
});

const Tree: React.FC<TreeModalProps> = ({treeData}) => {
  const [data, setPartsList] = useState<PartsList[]>([]);
      useEffect(() => {
        const pList: PartsList[] = [];
          flatNode(treeData,pList);
          setPartsList(pList);
          console.log("pList:",pList)
      }, [treeData]);
  const handleExportRows = (rows: MRT_Row<PartsList>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableFullScreenToggle:false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          全データを出力
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          検索後のデータを出力
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          チェックしたデータを出力
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table}/>;
};


export const TableModal: React.FC<DecisionSelectTableModalProps> = ({ state, onClose ,treeData}) => {
    if (!state.isOpen) return null;
    return (
      <ModalTableStyle onClick={(e) => e.stopPropagation()} >
        <Tree treeData = {treeData}/>
        <button onClick={onClose} style={{ zIndex: '1',position: 'absolute', top: '15px', right: '15px', backgroundColor: baseColors.danger, color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>{CloseIcon('white')}</button>
      </ModalTableStyle>
    );
};
