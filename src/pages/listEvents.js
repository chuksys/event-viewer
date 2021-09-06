import React from 'react';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import DeleteEventAlert from '../components/DeleteEventAlert';
import NavBar from '../components/Navbar';
import SimpleSnackbar from '../components/SnackBar'
import useEvent from '../hooks/useEvent';
import useStylesList from '../hooks/useStylesList';

export default function ListEvents() {
  const classes = useStylesList();

  const { events, deleteOpen, selectedEventName, selectedEventId, openSnackBar,
     handleDeleteClickOpen, handleDeleteClickClose, handleDeleteEvent,
     handleOpenSnackBar, handleCloseSnackBar
  } = useEvent()

  return (
    <>
      <NavBar />
      <SimpleSnackbar 
        open={openSnackBar} 
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
        message="Event Deleted"
        action=""
      />
      <Container component="main" maxWidth="lg">
      <CssBaseline />
      <DeleteEventAlert
            open={deleteOpen} 
            handleClose={handleDeleteClickClose} 
            handleClickOpen={handleDeleteClickOpen}
            selectedEventName={selectedEventName}
            selectedEventId={selectedEventId}
            handleDeleteEvent={handleDeleteEvent}
      />
      <div className={classes.paper}>
        <h1>List Events</h1>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <caption>List of event names, dates and descriptions</caption>
                <TableHead>
                <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Description&nbsp;</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                 
                {events === null || events.length < 1 ? <h2>No Events</h2> : events.map((event) => (
                    <TableRow key={event.name}>
                        <TableCell component="th" scope="row">
                            {event.name}
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                            {event.desc}
                        </TableCell>
                        <TableCell align="right">
                            <Link href={`/edit/`+event.id}>Edit</Link> <br/>
                            <Button onClick={() => handleDeleteClickOpen(event.id, event.name)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
      </Container>
    </>
  );
}