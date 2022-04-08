import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import * as React from 'react'

interface props {
  className: string
  children: React.ReactNode
  severity: 'error' | 'warning' | 'info' | 'success'
  direction: 'up' | 'right' | 'down' | 'left'
  open: boolean
  onClose: () => void
}

const TransitionAlerts = (props: props) => {
  const { className, children, severity, direction, open, onClose } = props
  return (
    <div className={className}>
      <Box sx={{ width: '100%' }}>
        <Slide direction={direction} in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                onClick={() => {
                  onClose()
                }}
                size="small"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity={severity}
            sx={{ mb: 2 }}
          >
            {children}
          </Alert>
        </Slide>
      </Box>
    </div>
  )
}

export default TransitionAlerts
