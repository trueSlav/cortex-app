const prisma = require('../prisma/prisma-client')

/**
	 * @route GET api/employees
	 * @desc get all employees
	 * @access Public
 */
const all = async (req, res) => {
	try {
		const employees = await prisma.employee.findMany()

		return res.status(200).json(employees)
	} catch (error) {
		res.status(400).json({message: "couldn't get employees"})
	}
}

/**
 * @route GET api/employees/:id
 * @desc get an employee by id
 * @access Public
 */
const single = async (req, res) => {
	const {id} = req.params
	try {
		const employee = await prisma.employee.findUnique({
			where: {
				id:+id
			}
		})
		res.status(200).json(employee)
	} catch {
		res.status(500).json({message: "couldn't get an employee by ID"})
	}
}

/**
	* @route POST api/employees/add
	* @desc set new employee
	* @access Public
*/
const add = async (req, res) => {
	try {
		const {name, surname, patronymic, department, hire_date} = req.body

		if (!name || !surname || !patronymic || !department || !hire_date) {
			return res.status(400).json({message: 'Please enter valid data'})
		}

		const employee = await prisma.employee.create({
			data: {
				name,
				surname,
				patronymic,
				department,
				hire_date,
			}
		})

		if(!employee) {
			return res.status(500).json({message: 'Employee created failed.'})
		} else {
			return res.send(employee)
		}
	} catch {
		res.status(500).json({message: "couldn't create an employee"})
	}
}

/**
 * @route DELETE api/employees/remove/:id
 * @desc remove an employee by id
 * @access Public
 */
const remove = async (req, res) => {
	try {
		const {id} = req.params
		await prisma.employee.delete({
			where: {
				id:+id
			}
		})
		return res.status(200).json({message: 'Employee deleted successfully.'})
	} catch {
		res.status(500).json({message: "couldn't delete employee by ID"})
	}
}

/**
 * @route PUT api/employees/edit/:id
 * @desc edit an employee by id
 * @access Public
 */
const edit = async (req, res) => {
	try {
		const data = req.body
		const {id} = req.params
		await prisma.employee.update({
			where: {
				id: +id
			},
			data
	 	})
		return res.status(200).json({message: 'Employee editing successfully.'})
	} catch (error) {
		res.status(500).json({message: `couldn't edit employee by ID, ${error}`})
	}
}

module.exports = {
	all,
	single,
	add,
	remove,
	edit
}