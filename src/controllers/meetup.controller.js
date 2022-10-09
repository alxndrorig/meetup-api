import {
    getAll,
    getById,
    create,
    remove,
    update,
} from "../services/meetup.services.js";

const getAllMeetups = async (req, res, next) => {
    const meetups = await getAll(req.query);
    res.json(meetups);
};

const getMeetupById = async (req, res, next) => {
    const meetup = await getById(req.params.id);
    if (!meetup) {
        res.status(404).json({ message: "Not found" });
    } else {
        res.json(meetup);
    }
};

const createMeetup = async (req, res, next) => {
    const meetup = await create(req.body);
    res.status(201).json(meetup);
};

const deleteMeetup = async (req, res, next) => {
    const meetup = await remove(req.params.id);
    if (meetup.rowCount) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Not found" });
    }
};

const changeMeetup = async (req, res, next) => {
    const meetup = await update(req.params.id, req.body);
    if (meetup.rowCount) {
        res.json(meetup.rows);
    } else {
        res.status(404).json({ message: "Not found" });
    }
};

export {
    getAllMeetups,
    getMeetupById,
    createMeetup,
    deleteMeetup,
    changeMeetup,
};
