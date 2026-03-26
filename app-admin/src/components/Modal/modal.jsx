import { useState } from 'react';
import { Modal, Box, Typography, Button,FormControl, Input,FormHelperText,InputLabel } from '@mui/material';

// Estilo obrigatório para o conteúdo centralizado
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styles = {
    areaCadastro : {
     position : 'abosulute',
     bottom : 10,
     right : 20
    },

}

export default function BasicModal(props) {

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
          <div className={`${styles.areaCadastro}`} >
                    <button onClick={handleOpen} className={`${styles.btnCadastro}`}>CADASTRAR NOVO PRODUTO</button>
              </div>
      {/* <Button onClick={handleOpen}>Abrir Modal</Button> */}
      
      <Modal
        open={open}
        onClose={handleClose} // Fecha ao clicar fora ou dar ESC
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
           <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          
          <Button onClick={handleClose} sx={{ mt: 3 }}>Fechar</Button>
        </Box>
      </Modal>
    </div>
  );
}