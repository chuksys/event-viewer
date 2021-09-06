import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import NavBar from '../components/Navbar';
import SimpleSnackbar from '../components/SnackBar'
import { useParams } from 'react-router-dom';
import Copyright from '../components/Copyright';
import useEvent from '../hooks/useEvent';
import useStylesAddEdit from '../hooks/useStylesAddEdit'

export default function EditEvent() {
  const classes = useStylesAddEdit();
  const { getEvent, openSnackBar, 
    handleEditEvent, handleOpenSnackBar, handleCloseSnackBar 
  } = useEvent();
  
  let { id } = useParams();

  const event = getEvent(id)

  const [name, setName] = useState(event[0].name);
  const [date, setDate] = useState(event[0].date);
  const [desc, setDesc] = useState(event[0].desc);

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleDateChange = e => {
        setDate(e.target.value)
    }

    const handleDescChange = e => {
        setDesc(e.target.value)
    }

  return (
    <>
      <NavBar />
      <SimpleSnackbar 
        open={openSnackBar} 
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        message="Event Edited"
        action="View Events"
      />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
        <h1>Edit Event</h1>
          <form className={classes.form} noValidate 
              onSubmit={(e) => handleEditEvent(e, id, name, date, desc)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="event-name"
              label="Event Name"
              name="name"
              value={name}
              onChange={handleNameChange}
              autoComplete="event-name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="date"
              value={date}
              onChange={handleDateChange}
              label="Event Date"
              type="date"
              id="event-date"
              autoComplete="event-date"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="desc"
              value={desc}
              onChange={handleDescChange}
              label="Event Description"
              multiline={true}
              rows={3}
              id="event-desc"
              autoComplete="event-desc"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Edit
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