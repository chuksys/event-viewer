import {useState} from "react"
import useSnackBar from "./useSnackBar";
import { v4 as uuidv4 } from 'uuid';

function useEvent() {
    let eventsStr = localStorage.getItem("events")
    let eventsArr = JSON.parse(eventsStr)
    const eventsList = eventsArr !== null ? 
        eventsArr.map(event => createData(event.id, event.name, event.date, event.desc)) : null

    const [events, setEvents] = useState(eventsList)    
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedEventName, setSelectedEventName] = useState("");
    const [selectedEventId, setSelectedEventId] = useState("")
    const { openSnackBar, handleOpenSnackBar, handleCloseSnackBar } = useSnackBar()


    function createData(id, name, date, desc) {
        return { id, name, date, desc };
    }

    const handleDeleteClickOpen = (id, name) => {
        setDeleteOpen(true);
        setSelectedEventName(name)
        setSelectedEventId(id)
    };

    const handleDeleteClickClose = () => {
        setDeleteOpen(false);
    };

    const handleDeleteEvent = (id) => {
        let existingEventsStr = localStorage.getItem("events")
        let existingEventsArr = JSON.parse(existingEventsStr)

        let newEventsArr = existingEventsArr.filter(e => e.id !== id);

        const newEventsList = newEventsArr !== null ? 
        newEventsArr.map(event => createData(event.id, event.name, event.date, event.desc)) : null
        setEvents(newEventsList)

        const newEventsStr = JSON.stringify(newEventsArr)
        localStorage.setItem("events", newEventsStr)

        setDeleteOpen(false)
        handleOpenSnackBar()
    }

    const handleAddEvent = (e, name, date, desc) => {
        let editedEventObj = {
            "id": uuidv4(),
            "name": name,
            "date": date,
            "desc": desc
        }
    
        e.preventDefault();
    
        let eventsArr = [];
        let eventsStr = localStorage.getItem("events")
        let newEventsList = null
    
        if(eventsStr === null) {
            eventsArr.push(editedEventObj)
        
            newEventsList = eventsArr !== null ? 
            eventsArr.map(event => 
                createData(event.id, event.name, event.date, event.desc)) : null
        
            const eventArrStr = JSON.stringify(eventsArr)   
            localStorage.setItem("events", eventArrStr)
        } else {
            eventsArr.push(editedEventObj)
            let existingEventsArr = JSON.parse(eventsStr)
            let updatedEventsArr = [...eventsArr, ...existingEventsArr]

            newEventsList = eventsArr !== null ? 
            updatedEventsArr.map(event => 
                createData(event.id, event.name, event.date, event.desc)) : null
    
            const updatedEventsStr = JSON.stringify(updatedEventsArr)
            localStorage.setItem("events", updatedEventsStr)
        }

        setEvents(newEventsList)
        handleOpenSnackBar()
    }

    const getEvent = id => {

        const events = localStorage.getItem("events")
        const eventsArr = JSON.parse(events)
        const event = eventsArr.filter(e => e.id === id)

        return event
    }

    const handleEditEvent = (e, id, name, date, desc) => {
        let eventDataObj = {
            "id": id,
            "name": name,
            "date": date,
            "desc": desc
        }
    
        e.preventDefault();
        let eventsStr = localStorage.getItem("events")
        let eventsArr = JSON.parse(eventsStr)

        let selectedEventIndex = eventsArr.findIndex(e => e.id === id);

        eventsArr[selectedEventIndex] = eventDataObj

        const updatedEventsStr = JSON.stringify(eventsArr)
        localStorage.setItem("events", updatedEventsStr)

        setEvents(eventsArr)
        handleOpenSnackBar()
    }
  
    return {
        events,
        deleteOpen,
        selectedEventName,
        selectedEventId,
        openSnackBar,
        handleDeleteClickOpen,
        handleDeleteClickClose,
        handleDeleteEvent,
        handleAddEvent,
        handleEditEvent,
        getEvent,
        handleOpenSnackBar,
        handleCloseSnackBar
    }
}

export default useEvent