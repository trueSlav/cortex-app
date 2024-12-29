const currentDate = new Date(Date.now())
const formattedDate = currentDate.toISOString().split('T')[0]

export {formattedDate}