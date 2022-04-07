import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import CloseIcon from '@mui/icons-material/Close'

interface props {
  className: string
  children: React.ReactNode
  severity: 'error' | 'warning' | 'info' | 'success'
  direction?: 'up' | 'right' | 'down' | 'left'
  open: boolean
  onClose: () => void
}

export default function TransitionAlerts(props: props) {
  return (
    <div className={props.className}>
      <Box sx={{ width: '100%' }}>
        <Slide direction={props.direction} in={props.open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  props.onClose()
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={props.severity}
            sx={{ mb: 2 }}
          >
            {props.children}
          </Alert>
        </Slide>
      </Box>
    </div>
  )
}
