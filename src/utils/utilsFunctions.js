export function getEarliestAndLatestDates(jsonObj) {
    let earliestDate = null
    let latestDate = null
    jsonObj.schedule.forEach((employee) => {
        employee.shifts.forEach((shift) => {
            const startDate = new Date(shift.start)
            const endDate = new Date(shift.end)
            if (!earliestDate || startDate < earliestDate) {
                earliestDate = startDate
            }
            if (!latestDate || endDate > latestDate) {
                latestDate = endDate
            }
        })
    })
    return {
        earliest: earliestDate.toISOString(),
        latest: latestDate.toISOString(),
    }
}

export function findScledureByDate(employeeData, dateString) {
    if (!employeeData.shifts || !employeeData.shifts.length) {
        return null
    }
    const foundShift = employeeData.shifts.find((shift) => {
        const shiftDate = shift.start.split('T')[0]
        return shiftDate === dateString
    })
    if (foundShift) {
        const startTime = foundShift.start.split('T')[1].substring(0, 5)
        const endTime = foundShift.end.split('T')[1].substring(0, 5)
        return `${startTime}-${endTime}`
    }
    return null
}

export function checkWorkTime(dateStr, plannedData, factData) {
    const plannedShift = plannedData.shifts.find((shift) => {
        const shiftDate = shift.start.split('T')[0]
        return shiftDate === dateStr
    })

    if (!plannedShift) {
        return ['absenteeism', 0]
    }

    const actualShift = factData?.shifts?.find((shift) => {
        const shiftDate = shift.start.split('T')[0]
        return shiftDate === dateStr
    })

    if (!actualShift) {
        return ['absenteeism', 0]
    }

    const getTimeFromDate = (dateTimeStr) => dateTimeStr.split('T')[1].substring(0, 5)
    const plannedStartTime = getTimeFromDate(plannedShift.start)
    const plannedEndTime = getTimeFromDate(plannedShift.end)
    const actualStartTime = getTimeFromDate(actualShift.start)
    const actualEndTime = getTimeFromDate(actualShift.end)
    const timeToMinutes = (timeStr) => {
        const timeParts = timeStr.split(':')
        const hours = Number(timeParts[0])
        const minutes = Number(timeParts[1])
        return hours * 60 + minutes
    }

    const plannedStart = timeToMinutes(plannedStartTime)
    const plannedEnd = timeToMinutes(plannedEndTime)
    const actualStart = timeToMinutes(actualStartTime)
    const actualEnd = timeToMinutes(actualEndTime)
    if (actualStart > plannedStart) {
        return ['lateness', actualStart - plannedStart]
    } else if (actualEnd < plannedEnd) {
        return ['leftEarly', plannedEnd - actualEnd]
    }
    return ['onTime', 0]
}

export function setColorByVerdict(verdict) {
    switch (verdict) {
        case 'onTime':
            return '#c5e1a5'
            break
        case 'lateness':
            return '#f381a7'
            break
        case 'leftEarly':
            return '#ffc570'
            break
        default:
            return 'wheat'
    }
}

export function setTagTextByVerdict(verdict) {
    switch (verdict) {
        case 'onTime':
            return 'ОК'
            break
        case 'lateness':
            return 'опоздание на'
            break
        case 'leftEarly':
            return 'ушел раньше на'
            break
        default:
            return null
    }
}
