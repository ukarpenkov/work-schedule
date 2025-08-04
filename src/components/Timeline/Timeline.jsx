import React, { useState } from 'react'
import { Box, List, ListItem, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { checkWorkTime, getEarliestAndLatestDates } from '../../utils/utilsFunctions'
import { DatePickerRange } from '../DatePickerRange/DatePickerRange'
import { EmployeeInfoCard } from '../EmployeeInfoCard/EmployeeInfoCard'
import { TimesheetElement } from '../TimesheetElement/TimesheetElement'

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
            <DatePickerRange
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
                minDate={start}
                maxDate={end}
            />

            <Paper
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: '#f7f9fc',
                    boxShadow: 1,
                    '&::-webkit-scrollbar': {
                        height: 12,
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
                            <EmployeeInfoCard employee={employee} />
                            {filteredDates.map((date) => {
                                const currentTimesheetResult = checkWorkTime(date, employee, fact.schedule[index])
                                const verdict = currentTimesheetResult[0]
                                const differentTime = currentTimesheetResult[1]
                                return (
                                    <TimesheetElement
                                        key={date}
                                        date={date}
                                        employee={employee}
                                        fact={fact}
                                        verdict={verdict}
                                        differentTime={differentTime}
                                        index={index}
                                    />
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
