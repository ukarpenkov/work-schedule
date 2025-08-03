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
