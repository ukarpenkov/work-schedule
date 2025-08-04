import React from 'react'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function DatePickerRange({ dateFrom, dateTo, onDateFromChange, onDateToChange, minDate, maxDate }) {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Дата от" value={dateFrom} onChange={onDateFromChange} minDate={minDate} maxDate={dateTo || maxDate} />
                <DatePicker label="Дата до" value={dateTo} onChange={onDateToChange} minDate={dateFrom || minDate} maxDate={maxDate} />
            </LocalizationProvider>
        </Box>
    )
}

