import { Box, Button, Typography } from '@mui/material'
import { useRef } from 'react'

export function FilePicker({ onPlanSelect, onFactSelect, onShowChart, plan, fact }) {
    const planInputRef = useRef(null)
    const factInputRef = useRef(null)

    return (
        <Box sx={{ display: 'flex', minHeight: '90vh', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Загрузите данные для отображения графика
                </Typography>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Box sx={{ display: 'grid' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            План
                        </Typography>
                        <input type="file" accept=".json" onChange={onPlanSelect} ref={planInputRef} style={{ display: 'none' }} />
                        <Button
                            variant="outlined"
                            onClick={() => planInputRef.current.click()}
                            sx={{ backgroundColor: plan ? '#1565C0' : 'white', color: plan ? 'red' : 'black' }}
                        >
                            {plan ? 'Файл выбран' : 'Выбрать файл'}
                        </Button>
                    </Box>
                    <div style={{ width: '20px' }}></div>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Факт
                        </Typography>
                        <input type="file" accept=".json" onChange={onFactSelect} ref={factInputRef} style={{ display: 'none' }} />
                        <Button
                            variant="outlined"
                            onClick={() => factInputRef.current.click()}
                            sx={{ backgroundColor: fact ? '#1565C0' : 'white', color: fact ? 'red' : 'black' }}
                        >
                            {fact ? 'Файл выбран' : 'Выбрать файл'}
                        </Button>
                    </Box>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button variant="contained" onClick={onShowChart} disabled={!plan || !fact} sx={{ width: 100, height: 35 }}>
                        ОК
                    </Button>
                </div>
            </Box>
        </Box>
    )
}
