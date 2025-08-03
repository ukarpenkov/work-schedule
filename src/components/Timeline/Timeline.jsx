import React, { useState } from 'react'
import { Box, Chip, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import {
    checkWorkTime,
    findScledureByDate,
    getEarliestAndLatestDates,
    setColorByVerdict,
    setTagTextByVerdict,
} from '../../utils/utilsFunctions'

const Timeline = ({ plan, fact }) => {
    const limitDates = getEarliestAndLatestDates(plan)
    const start = dayjs(limitDates.earliest)
    const end = dayjs(limitDates.latest)

    const [dateFrom, setDateFrom] = useState(start)
    const [dateTo, setDateTo] = useState(end)
    const generateDates = (startDate, endDate) => {
        const dates = []
        let currentDate = dayjs(startDate).startOf('day')
        const safeEnd = dayjs(endDate).endOf('day')

        while (currentDate.isBefore(safeEnd) || currentDate.isSame(safeEnd, 'day')) {
            dates.push(currentDate.format('YYYY-MM-DD'))
            currentDate = currentDate.add(1, 'day')
        }
        return dates
    }
    const filteredDates = generateDates(dateFrom, dateTo)

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Рабочий график
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Дата от"
                        value={dateFrom}
                        onChange={(newValue) => setDateFrom(newValue)}
                        minDate={start}
                        maxDate={dateTo || end}
                    />
                    <DatePicker
                        label="Дата до"
                        value={dateTo}
                        onChange={(newValue) => setDateTo(newValue)}
                        minDate={dateFrom || start}
                        maxDate={end}
                    />
                </LocalizationProvider>
            </Box>

            <Paper
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: '#f7f9fc',
                    boxShadow: 1,
                    '&::-webkit-scrollbar': {
                        height: 6,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#b0b0b0',
                        borderRadius: 4,
                        '&:hover': {
                            cursor: 'pointer',
                        },
                    },
                }}
            >
                <List sx={{ display: 'grid' }}>
                    {plan.schedule.map((employee, index) => (
                        <ListItem
                            key={employee.role + employee.employee}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                minWidth: 200,
                                maxWidth: 200,
                                maxHeight: 100,
                                padding: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                marginRight: 1,
                                backgroundColor: '#ffffff',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    backgroundColor: '#f0f4f8',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <div className="employee-info-card">
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" fontWeight="bold">
                                            {employee.employee}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="caption" color="textSecondary">
                                            {employee.role} <br />
                                            {employee.store}
                                        </Typography>
                                    }
                                />
                            </div>
                            {filteredDates.map((date) => {
                                const currentTimesheetResult = checkWorkTime(date, employee, fact.schedule[index])
                                const verdict = currentTimesheetResult[0]
                                const differentTime = currentTimesheetResult[1]

                                return (
                                    <ListItem
                                        key={date}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minWidth: 200,
                                            maxWidth: 200,
                                            maxHeight: 100,
                                            minHeight: 100,
                                            alignItems: 'center',
                                            padding: 1,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 1,
                                            marginRight: 1,
                                            backgroundColor: setColorByVerdict(verdict),
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            transition: 'filter 0.2s ease',
                                            '&:hover': {
                                                filter: 'brightness(0.75)',
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2" fontWeight="bold" align="center" noWrap>
                                                    {dayjs(date).format('DD')}.{dayjs(date).format('MM')}.{dayjs(date).format('YYYY')}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" fontWeight="bold" align="center" noWrap>
                                                    {findScledureByDate(employee, date)
                                                        ? ` План: ${findScledureByDate(employee, date)}`
                                                        : null}
                                                    <br />
                                                    {findScledureByDate(fact.schedule[index], date)
                                                        ? ` Факт: ${findScledureByDate(fact.schedule[index], date)}`
                                                        : null}
                                                </Typography>
                                            }
                                        />
                                        {setTagTextByVerdict(verdict) && (
                                            <Chip
                                                label={
                                                    setTagTextByVerdict(verdict) === 'ОК'
                                                        ? setTagTextByVerdict(verdict)
                                                        : `${setTagTextByVerdict(verdict)} на ${differentTime} мин`
                                                }
                                                color="#bababa"
                                                sx={{
                                                    height: '15px',
                                                    borderRadius: '16px',
                                                    position: 'absolute',
                                                    right: '10px',
                                                    bottom: '5px',
                                                    '& .MuiChip-label': {
                                                        padding: '0 8px',
                                                    },
                                                }}
                                            />
                                        )}
                                    </ListItem>
                                )
                            })}
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    )
}

export default Timeline
