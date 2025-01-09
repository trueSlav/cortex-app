const prisma = require('../prisma/prisma-client')

const createUser = async (req, res) => {
	const {name, surname, patronymic, department, hire_date} = req.body

	if (!name || !surname || !patronymic || !department || !hire_date) {
		return res.status(400).json({message: 'Please enter valid data'})
	}

	const user = await prisma.user.create({
		data: {
			name,
			surname,
			patronymic,
			department,
			hire_date,
		}
	})

	if(!user) {
		return res.status(404).json({message: 'User created failed.'})
	} else {
		return res.send(user)
	}
}

module.exports = createUser
