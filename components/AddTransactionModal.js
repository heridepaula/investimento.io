import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material'

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
    console.log(transaction)
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          id="modal-add-transaction"
        >
          Nova Transação
        </Typography>
        <Typography id="modal-description">
          Adicione os detalhes da sua transação aqui.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            name="name"
            value={transaction.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Valor"
            name="value"
            type="number"
            value={transaction.value}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            select
            label="Tipo"
            name="type"
            value={transaction.type}
            onChange={handleChange}
          >
            <MenuItem value="income">Receita</MenuItem>
            <MenuItem value="expense">Despesa</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Adicionar
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddTransactionModal
