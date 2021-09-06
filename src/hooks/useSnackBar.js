import { useState } from "react"

function useSnackBar() {
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenSnackBar = () => {
      setOpenSnackBar(true);
    };
  
    const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackBar(false);
    };

    return {
        openSnackBar,
        handleOpenSnackBar,
        handleCloseSnackBar
    }

}

export default useSnackBar