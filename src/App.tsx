import React, { useState } from 'react';
import './App.css';
import { Paper, TextField, Button, Stack, Typography } from '@mui/material';
import Axios from 'axios';

export const App = () => {

  const [input, setInput] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');

  const generateQrCode = async () => {
    if (input === '' || input == null) {
      setQrCode('');
    } else {
      console.log('Generating with input ' + input);
      try {
        const res = await Axios.post('http://localhost:3002/qrcode', { input });
        setQrCode(res.data);
        console.log(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='App'>
      <Paper elevation={3} className="paper">
        <Stack spacing={2} direction="column" className="paperZone">
          <Typography variant="h3" className="poppinsFont title" sx={{ fontSize: '2.5em', fontFamily: 'Poppins, sans-serif', fontWeight: '600', marginTop: '1em'}}>
            QR Code Generator
          </Typography>
          <TextField
          label="Enter your text / url"
          variant="outlined"
          className="poppinsFont input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ width: '80%', alignSelf: 'center', top: '5vh', position: 'relative'}}
          />
          <Button 
          variant="contained" 
          className="button"
          sx={{ width: '80%', alignSelf: 'center', top: '5vh', position: 'relative', color: 'white'}}
          onClick={generateQrCode}>
            Generate QR Code
          </Button>
          { qrCode ? <img src={qrCode} alt="QR Code" className="qrCode"/> : null}
        </Stack>
      </Paper>
    </div>
  );
};