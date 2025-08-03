import React from 'react'
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { checkWorkTime, findScledureByDate, getEarliestAndLatestDates, setColorByVerdict } from '../../utils/utilsFunctions'

const Timeline = ({ plan, fact }) => {
    const limitDates = getEarliestAndLatestDates(plan)
    const start = dayjs(limitDates.earliest)
    const end = dayjs(limitDates.latest)

    const dates = []
    let currentDate = start.startOf('day')
    const safeEnd = end.endOf('day')

    while (currentDate.isBefore(safeEnd) || currentDate.isSame(safeEnd, 'day')) {
        dates.push(currentDate.format('YYYY-MM-DD'))
        currentDate = currentDate.add(1, 'day')
    }

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Рабочий график
            </Typography>
            <Paper
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    padding: 1,
                    height: 1000,
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
                <List
                    sx={{
                        display: 'grid',
                    }}
                >
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
                            {dates.map((date) => {
                                const currentTimesheetResult = checkWorkTime(date, employee, fact.schedule[index])
                                const verdict = currentTimesheetResult[0]
                                const timeDifference = currentTimesheetResult[1]

                                return (
                                    <ListItem
                                        key={date}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minWidth: 200,
                                            maxWidth: 200,
                                            alignItems: 'center',
                                            padding: 1,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 1,
                                            marginRight: 1,
                                            backgroundColor: setColorByVerdict(verdict),
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                backgroundColor: '#f0f4f8',
                                                transition: 'all 0.2s ease',
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
