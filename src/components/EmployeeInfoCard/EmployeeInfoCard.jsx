import { ListItemText, Typography } from '@mui/material'

export function EmployeeInfoCard({ employee }) {
    return (
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
    )
}
