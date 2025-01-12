const prisma = require('../prisma/prisma-client')

/**
 * @route GET api/departments
 * @desc get all departments
 * @access Public
*/
const all = async (req, res) => {
	try {
		const departments = await prisma.department.findMany()
		res.json(departments)
	} catch {
		res.status(500).json({message: "couldn't get departments"})
	}
}

/**
 * @route POST api/departments/add
 * @desc create new department
 * @access Public
 */
const add = async (req, res) => {
	try {
		const {name, description} = req.body

		if (!name || !description) {
			return res.status(400).json({message: 'Please enter valid data.'})
		}

		const department = await prisma.department.create({
			data: {name, description},
		})

		if(!department) {
			return res.status(500).json({message: 'Employee created failed.'})
		} else {
			return res.send(department)
		}
	} catch {
		res.status(500).json({message: "couldn't create new department"})
	}
}

/**
 * @route GET api/departments/:id
 * @desc get department by id
 * @access Public
 */
const single = async (req, res) => {
	try {
		const {id} = req.params

		const department = await prisma.department.findUnique({
			where:{
				id: +id
			}
		})

		if(!department) {
			return res.status(500).json({message: "couldn't find department"})
		}

		res.json(department)
	}	catch {
		res.status(500).json({message: "couldn't get department"})
	}
}

/**
 * @route DELETE api/departments/remove/:id
 * @desc remove an department by id
 * @access Public
 */
const remove = async (req, res) => {
	try {
		const {id} = req.params
		await prisma.department.delete({
			 where: {
				 id:+id
			 }
		})
		return res.status(200).json({message: 'Department deleted successfully.'})
	} catch {
		res.status(500).json({message: "couldn't delete department by ID"})
	}
}

/**
 * @route PUT api/departments/edit/:id
 * @desc edit department by id
 * @access Public
 */
const edit = async (req, res) => {
	try {
		const data = req.body
		const {id} = req.params
		await prisma.department.update({
			 where: {
					 id: +id
			 },
			 data
		 })
		return res.status(200).json({message: 'Department editing successfully.'})
	} catch (error) {
		res.status(500).json({message: `couldn't edit department by ID, ${error}`})
	}
}

module.exports = {
	all,
	add,
	single,
	remove,
	edit,
}
