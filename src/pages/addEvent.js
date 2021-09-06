import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NavBar from '../components/Navbar';
import SimpleSnackbar from '../components/SnackBar'
import useEvent from '../hooks/useEvent';
import useStylesAddEdit from '../hooks/useStylesAddEdit';
import Copyright from '../components/Copyright';

export default function AddEvent() {
  const classes = useStylesAddEdit();
  const { openSnackBar, handleAddEvent, handleOpenSnackBar, handleCloseSnackBar } = useEvent();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const handleEventNameChange = (e) => {
      setName(e.target.value)
  }

  const handleEventDateChange = (e) => {
      setDate(e.target.value)
  }

  const handleEventDescChange = (e) => {
      setDesc(e.target.value)
  }

  return (
    <>
      <NavBar />
      <SimpleSnackbar 
        open={openSnackBar} 
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        message="Event Added"
        action="View Events"
      />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
        <h1>Add Event</h1>
          <form className={classes.form} noValidate 
            onSubmit={(e) => handleAddEvent(e, name, date, desc)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="event-name"
              label="Event Name"
              name={name}
              autoComplete="event-name"
              autoFocus
              onChange={handleEventNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={date}
              label="Event Date"
              type="date"
              id="event-date"
              autoComplete="event-date"
              onChange={handleEventDateChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={desc}
              label="Event Description"
              multiline={true}
              rows={3}
              id="event-desc"
              autoComplete="event-desc"
              onChange={handleEventDescChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}