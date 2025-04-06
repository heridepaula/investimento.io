import React, { useState } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'

import SouthWestTwoToneIcon from '@mui/icons-material/SouthWestTwoTone'
import NorthEastTwoToneIcon from '@mui/icons-material/NorthEastTwoTone'

const AddTransactionModal = ({ open, onClose, onBackdropClick }) => {
  const [transaction, setTransaction] = useState({
    name: '',
    value: '',
    type: 'income',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTransaction((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      onBackdropClick={onBackdropClick}
      aria-labelledby="modal-add-transaction"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 32px)',
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Papel"
              name="name"
              value={transaction.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Quantidade"
              name="quantity"
              type="number"
              value={transaction.quantity || ''}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Valor Unitário (R$)"
              name="unitValue"
              type="text"
              value={transaction.unitValue || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '') || '0'
                const formattedValue = (parseFloat(value) / 100).toLocaleString(
                  'pt-BR',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
                setTransaction((prev) => ({
                  ...prev,
                  unitValue: formattedValue,
                }))
              }}
            />
            <TextField
              fullWidth
              label="Valor Total (R$)"
              name="totalValue"
              type="text"
              value={
                !isNaN(transaction.quantity) &&
                !isNaN(
                  parseFloat(
                    transaction.unitValue?.replace(/\./g, '').replace(',', '.')
                  )
                )
                  ? (
                      transaction.quantity *
                      parseFloat(
                        transaction.unitValue
                          .replace(/\./g, '')
                          .replace(',', '.')
                      )
                    ).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : ''
              }
              InputProps={{
                readOnly: true,
              }}
              disabled
            />
          </Box>
          <TextField
            fullWidth
            label="Data da Transação"
            name="date"
            type="date"
            value={transaction.date || new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              type="button"
              variant={transaction.type === 'buy' ? 'contained' : 'outlined'}
              color="success"
              onClick={() =>
                setTransaction((prev) => ({ ...prev, type: 'buy' }))
              }
              sx={{
                flex: 1,
                mr: 1,
                height: 56,
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
              startIcon={<SouthWestTwoToneIcon />}
            >
              Compra
            </Button>
            <Button
              type="button"
              variant={transaction.type === 'sell' ? 'contained' : 'outlined'}
              color="error"
              onClick={() =>
                setTransaction((prev) => ({ ...prev, type: 'sell' }))
              }
              sx={{
                flex: 1,
                ml: 1,
                height: 56,
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
              startIcon={<NorthEastTwoToneIcon />}
            >
              Venda
            </Button>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            Confirmar
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTransactionModal
