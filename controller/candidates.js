const candidatesModel = require('../models/candidatesModel')
const statusCodes = require('../utils/statusCodes')
const { Op, where } = require('sequelize')
const { QueryParm, pagination } = require('../utils/helper')
const sendMail = require('../utils/sendMail')
const addCandidate = async (req, reply) => {
    try {
        const { name, email, phone, schduledtime } = req.body
        if (!name || !email || !phone) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({
                status: false,
                message: statusCodes.message.NOTACCEPTABLE,
                error: []
            })
        }
        const details = await candidatesModel.findOne({ where: { email: email } })
        if (details) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({ status: false, message: statusCodes.message.NOTACCEPTABLE, error: ["The email is already registered"] })
        }
        const newUser = {
            name, email, phone, schduledtime
        }
        const createUser = await candidatesModel.create(newUser)
        const response = await sendMail(email)
        if (response.messageId) {
            await candidatesModel.update({ sendflag: true }, {
                where: { id: createUser.id }
            })
        }

        reply.status(statusCodes.status.CREATED).send({
            status: true,
            message: statusCodes.message.CREATED,
            error: []
        })


    }
    catch (e) {
        reply.status(statusCodes.status.INTERNALSERVERERROR).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}
const reschduleCandidates = async (req, reply) => {
    try {
        if (!req.params.id) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({
                status: false,
                message: statusCodes.message.NOTACCEPTABLE,
                error: []
            })
        }
        const { schduledtime } = req.body
        const userDetails = await candidatesModel.findOne({ where: { id: req.params.id } })
        if (!userDetails) {
            return reply.status(statusCodes.status.NOTFOUND).send({
                status: false,
                message: statusCodes.message.NOTFOUND,
                error: []
            })
        }
        const updateUser = await candidatesModel.update({ schduledtime: schduledtime }, { where: { id: req.params.id } })
        const response = await sendMail(userDetails.email)
        if (response.messageId) {
            await candidatesModel.update({ sendflag: true }, {
                where: { id: req.params.id }
            })
        }
        reply.status(statusCodes.status.OK).send({
            status: true,
            message: "Reschduled Successfully",
            error: []
        })

    }
    catch (e) {
        reply.status(statusCodes.status.NOTACCEPTABLE).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}
const updateCandidateDetails = async (req, reply) => {
    try {
        if (!req.params.id) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({
                status: false,
                message: statusCodes.message.NOTACCEPTABLE,
                error: []
            })
        }
        const { name, email, phone, schduledtime } = req.body
        if (!name || !email || !phone || !schduledtime) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({
                status: false,
                message: statusCodes.message.NOTACCEPTABLE,
                error: []
            })
        }
        const userDetails = await candidatesModel.findOne({ where: { id: req.params.id } })
        if (!userDetails) {
            return reply.status(statusCodes.status.NOTFOUND).send({
                status: false,
                message: statusCodes.message.NOTFOUND,
                error: []
            })
        }
        const userData = { name, email, phone, schduledtime }
        const updateUser = await candidatesModel.update(userData, { where: { id: req.params.id } })
        reply.status(statusCodes.status.OK).send({
            status: true,
            message: updateUser,
            error: []
        })

    }
    catch (e) {
        reply.status(statusCodes.status.INTERNALSERVERERROR).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}
const getCandidate = async (req, reply) => {
    try {
        if (!req.params.id) {
            return reply.status(statusCodes.status.NOTACCEPTABLE).send({
                status: false,
                message: statusCodes.status.NOTACCEPTABLE,
                error: []
            })
        }
        const userDetails = await candidatesModel.findOne({ where: { id: req.params.id } })
        if (!userDetails) {
            return reply.status(statusCodes.status.NOTFOUND).send({
                status: false,
                message: statusCodes.message.NOTFOUND,
                error: []
            })
        }
        reply.status(statusCodes.status.OK).send({
            status: true,
            message: userDetails,
            error: []
        })

    }
    catch (e) {
        reply.status(statusCodes.status.INTERNALSERVERERROR).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}


const deleteCandidate = async (req, reply) => {
    try {
        const { id } = req.params
        const userDetails = await candidatesModel.findOne({ where: { id: id } })
        if (!userDetails) {
            return reply.status(statusCodes.status.NOTFOUND).send({
                status: false,
                message: statusCodes.message.NOTFOUND,
                error: []
            })
        }
        const DeleteDetails = await candidatesModel.destroy({ where: { id: id } })
        if (!DeleteDetails) {
            return reply.status(statusCodes.status.BADREQUEST).send({
                status: false,
                message: statusCodes.message.FAILED,
                error: []
            })
        }
        reply.status(statusCodes.status.OK).send({
            status: true,
            message: statusCodes.message.OK,
            error: []
        })
    }
    catch (e) {

    }
}
const getCandidates = async (req, reply) => {
    try {
        const { limit, page, search, orderBy, sortedBy } = req.query
        let whereCondition = []
        let condition = {
            where: whereCondition,
            order: [["created_at", "DESC"]]
        }
        if (search || orderBy || sortedBy) {
            condition = await filterQuerys(search, orderBy, sortedBy)
        }
        const details = await candidatesModel.findAll(condition)
        const userData = details.map((e) => {
            return {
                "id": e.id,
                "name": e.name,
                "email": e.email,
                "phone": e.phone,
                "schduled_time": e.schduledtime,
            }
        })
        const result = await pagination(userData, page, limit)
        reply.status(statusCodes.status.OK).send({
            status: true,
            data: result,
            error: []
        })

    }
    catch (e) {
        reply.status(statusCodes.status.INTERNALSERVERERROR).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}

const getCandidatesWithFailedEmails = async (req, reply) => {
    try {
        const { limit, page, orderBy, sortedBy } = req.query
        let condition = {
            where: { sendflag: 0 },
            order: [["created_at", "DESC"]]
        }
        if (orderBy || sortedBy) {
            condition.order.push([[orderBy, sortedBy]])
        }
        const details = await candidatesModel.findAll(condition)
        data = details.map((e) => {
            return {
                "email": e.email
            }
        })
        const result = await pagination(data, page, limit)
        reply.status(statusCodes.status.OK).send({
            status: true,
            data: result,
            error: []
        })

    }
    catch (e) {
        reply.status(statusCodes.status.INTERNALSERVERERROR).send({
            status: false,
            message: statusCodes.message.FAILED,
            error: e.message
        })
    }
}

const filterQuerys = async function (search, orderBy, sortedBy) {
    let filterQuery = []
    let whereCondition = []
    var obj = await QueryParm(search)
    if (obj["sendflag"]) {
        whereCondition.push({ sendflag: { [Op.eq]: obj["sendflag"] } }
        )
    }
    if (obj["name"]) {
        whereCondition.push({ name: { [Op.like]: `%${obj["name"]}%` } }
        )
    }
    if (obj["email"]) {
        whereCondition.push({ email: { [Op.like]: `%${obj["name"]}%` } }
        )
    }
    if (obj["phone"]) {
        whereCondition.push({ phone: { [Op.eq]: obj["phone"] } }
        )
    }
    if (orderBy || sortedBy) {
        filterQuery = {
            where: { [Op.or]: whereCondition },
            order: [[orderBy, sortedBy]]
        }
    }
    return filterQuery
}
module.exports = {
    addCandidate, getCandidates, getCandidate, reschduleCandidates, updateCandidateDetails, deleteCandidate, getCandidatesWithFailedEmails
}