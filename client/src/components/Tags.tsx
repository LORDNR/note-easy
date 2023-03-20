import { Cancel, Tag } from '@mui/icons-material'
import { Box, FormControl, Stack, TextField, Typography } from '@mui/material'

import { useRef, useState } from 'react'

export function Tags({ data, handleDelete }: any) {
    return (
        <Box
            sx={{

                height: '100%',
                display: 'flex',
                padding: '0.4rem',
                margin: '0 0.5rem 0 0',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: 'lightsalmon',
                color: 'white',
                borderRadius: '16px'
            }}
        >
            <Stack direction="row" gap={1}>
                <Typography>{data}</Typography>
                <Cancel
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        handleDelete(data)
                    }}
                />
            </Stack>
        </Box>
    )
}
