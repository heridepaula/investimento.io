import React, { useState, useEffect } from 'react'
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Grid,
  Tooltip,
} from '@mui/material'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import Layout from '../../components/Layout'
import AddTransactionModal from '../../components/AddTransactionModal'

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([
    {
      date: '2023-01-01',
      stock: 'AAPL',
      type: 'Compra',
      unitValue: 150,
      quantity: 10,
    },
    {
      date: '2023-02-01',
      stock: 'GOOGL',
      type: 'Venda',
      unitValue: 2800,
      quantity: 5,
    },
    {
      date: '2023-03-01',
      stock: 'MSFT',
      type: 'Compra',
      unitValue: 300,
      quantity: 8,
    },
    ...Array.from({ length: 97 }, (_, i) => {
      const date = new Date(2023, 2, i + 2)
      return {
        date: date.toISOString().split('T')[0],
        stock: `STOCK${i + 1}`,
        type: i % 2 === 0 ? 'Compra' : 'Venda',
        unitValue: Math.floor(Math.random() * 1000) + 50,
        quantity: Math.floor(Math.random() * 100) + 1,
      }
    }),
  ])
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.stock.toLowerCase().includes(filter.toLowerCase())
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getTableCellContent = (transaction, column) => {
    switch (column) {
      case 'date':
        return new Date(transaction.date).toLocaleDateString('pt-BR')
      case 'stock':
        return transaction.stock
      case 'type':
        return transaction.type
      case 'unitValue':
        return transaction.unitValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      case 'quantity':
        return transaction.quantity
      case 'total':
        return (transaction.unitValue * transaction.quantity).toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          }
        )
      default:
        return ''
    }
  }

  const renderTableRows = () => {
    const columns = isMobile
      ? ['date', 'stock', 'total']
      : ['date', 'stock', 'type', 'unitValue', 'quantity', 'total']

    return filteredTransactions
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((transaction, index) => (
        <TableRow
          key={index}
          sx={{
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          {columns.map((column) => (
            <TableCell key={column}>
              {getTableCellContent(transaction, column)}
            </TableCell>
          ))}
        </TableRow>
      ))
  }

  const [openModal, setOpenModal] = useState(false)

  return (
    <Layout>
      <AddTransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onBackdropClick={() => setOpenModal(false)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Filtrar por papel"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Nova transação">
            <AddCircleSharpIcon
              style={{
                fontSize: 40,
                color: '#1976d2',
                cursor: 'pointer',
              }}
              onClick={() => setOpenModal(true)}
            />
          </Tooltip>
        </Grid>
        <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data de Transação</TableCell>
                <TableCell>Papel</TableCell>
                {!isMobile && <TableCell>Tipo</TableCell>}
                {!isMobile && <TableCell>Valor Unitário</TableCell>}
                {!isMobile && <TableCell>Quantidade</TableCell>}
                <TableCell>Total da Transação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Itens"
        />
      </Grid>
    </Layout>
  )
}

export default TransactionsList
