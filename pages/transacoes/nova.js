import React from 'react'

const AddTransactionModal = () => {
  return (
    <div>
      <Modal
        open={true}
        onClose={() => {}}
        aria-labelledby="add-transaction-modal-title"
        aria-describedby="add-transaction-modal-description"
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '10%',
            width: 400,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography
            id="add-transaction-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Nova Transação
          </Typography>
          <form>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                id="transaction-name"
                label="Nome"
                variant="outlined"
                name="name"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                id="transaction-amount"
                label="Valor"
                variant="outlined"
                name="amount"
                type="number"
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                id="transaction-type"
                label="Tipo"
                variant="outlined"
                name="type"
                select
              >
                <MenuItem value="income">Receita</MenuItem>
                <MenuItem value="expense">Despesa</MenuItem>
              </TextField>
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Adicionar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
