import { RequestHandler } from "express";
import noteModel from "../models/node";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// ! _______________________GET NOTES________________________ ! //
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await noteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// ! _______________________GET A SINGLE NOTE________________________ ! //
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await noteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not Found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

// ! _______________________CRAETE NOTE________________________ ! //
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Your notes must have a title");
    }
    const newNote = await noteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
// ! _______________________UPDATE NOTE________________________ ! //
interface updateNoteParams {
  noteId: string;
}
interface updateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  updateNoteParams,
  unknown,
  updateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Your can't update a note without a title");
    }

    const note = await noteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(
        404,
        "The note you are trying to update does not exist"
      );
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// ! _______________________DELETE NOTE________________________ ! //
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await noteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    await note.deleteOne();
    // * the method above does the delete operation. The two below aren't really working
    // await note.remove();
    // noteModel.findByIdAndDelete()

    res.sendStatus(204);

    res;
  } catch (error) {
    next(error);
  }
};
