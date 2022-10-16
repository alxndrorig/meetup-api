import {
    getAll,
    getById,
    create,
    remove,
    update,
} from "../services/meetup.services.js";

export const getAllMeetups = async (req, res, next) => {
    const meetups = await getAll(req.query);
    res.json(meetups);
};

export const getMeetupById = async (req, res, next) => {
    const meetup = await getById(req.params.id);
    if (!meetup) {
        res.status(404).json({ message: "Not found" });
    } else {
        res.json(meetup);
    }
};

export const createMeetup = async (req, res, next) => {
    const meetup = await create(req.body);
    res.status(201).json(meetup);
};

export const deleteMeetup = async (req, res, next) => {
    const meetup = await remove(req.params.id);
    if (meetup.rowCount) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Not found" });
    }
};

export const changeMeetup = async (req, res, next) => {
    const meetup = await update(req.params.id, req.body);
    if (meetup.rowCount) {
        res.json(meetup.rows);
    } else {
        res.status(404).json({ message: "Not found" });
    }
};
