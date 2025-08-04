import { Chip, ListItem, ListItemText, Typography } from '@mui/material'
import { findScledureByDate, setColorByVerdict, setTagTextByVerdict } from '../../utils/utilsFunctions'
import dayjs from 'dayjs'

export function TimesheetElement({ date, employee, fact, verdict, differentTime, index }) {
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
                        {findScledureByDate(employee, date) ? ` План: ${findScledureByDate(employee, date)}` : null}
                        <br />
                        {findScledureByDate(fact.schedule[index], date) ? ` Факт: ${findScledureByDate(fact.schedule[index], date)}` : null}
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
}
