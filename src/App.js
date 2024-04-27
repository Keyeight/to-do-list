import './App.css';
import {Button, Modal, Box, IconButton, } from "@mui/material"
import {useState, useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import AlarmIcon from '@mui/icons-material/Alarm';
import moment from 'moment';

function Main() {

  //estilização do modal//
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

  //variaveis e controle state modal//
  const [openModal, setOpenModal] = useState(false);

    function handleOpen () {
      setOpenModal(true);
    }

    function handleClose () {
      setOpenModal(false);
    }

  //variaveis e controle state hora e data//
  const [currentTime, setCurrentTime] = useState(moment().format('DD dddd MMMM YYYY HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('DD dddd MMMM YYYY HH:mm:ss'));
    }, 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const optionsPriorities = [
    { 
      name: "Alta Prioridade",
      value: 1
    },
    { 
      name: "Média Prioridade",
      value: 2
    },
    { 
      name: "Baixa Prioridade",
      value: 3
    }
  ]

  const [selectionPriority, setSelectionPriority] = useState(1);

  function handleSelectionPriority (event) {
    setSelectionPriority(event.target.value, selectionPriority);

    console.log("Selection priority", selectionPriority)
  }

  return (
    <div className="Main">
      <header className="main-header">
        <div>
          {currentTime}
        </div>
        
        <Button onClick={handleOpen}>
        <IconButton color="secondary" aria-label="add an event">
          <AlarmIcon />
        </IconButton>
        </Button>
        
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: 400, height: 500 }}>
          <label>Escolha o tipo de prioridade: </label>
          {/* Gerir o estado do Select */}
           {/* => = return function() */}
          <select name='priority' id='priority' value={selectionPriority.name} onChange={(e) => handleSelectionPriority(e)}>
           {optionsPriorities.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>
           ))}
          </select>
          <label>
            Escolha o titulo da tarefa:
            <input type='text'></input>
          </label>
          <label> 
          Digite o seu tipo de tarefa:
          <input type='text'></input>
          <Button variant="contained" endIcon={<SendIcon />}>Criar</Button>
          </label>
        </Box>
        </Modal>
      </header>
      </div>
  );
}

export default Main;