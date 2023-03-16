import { Request, Response } from 'express';

import { Feedback } from "../../models";
import { success, error } from "../../../utils/http-responses";

/**
 * Returns all documents from the Feedback collection.
 * @param request 
 * @param response 
 */
const findAll = async (request: Request, response: Response) => {

    // Params and meta data
    const skip: number = Number(request.query.skip);
    const limit: number = Number(request.query.limit);
    const count = await Feedback.find().estimatedDocumentCount();
    
    // Retun documents in desc order.
    return await Feedback
    .find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt: 'desc'})
    .then((document) => success(response, 200, {count, document}))
    .catch((err) => error(response, 500, err.message));
}

/**
 * Returns a single document form the Feedback collection.
 * @param request 
 * @param response 
 */
const findOne = async (request: Request, response: Response) => {

    // Return document matching id.
    return await Feedback
    .findById(request.params.id)
    .then((document) => success(response, 200, document))
    .catch((err) => error(response, 500, err.message));
}

/**
  * Creates a new document and stores it.
  * @param request 
  * @param response 
  */
const create = async(request: Request, response: Response) => {

    const data = request.body;

    const user_data = {
        ip2: request.ip,
        ip: request.connection.remoteAddress,
        host: request.headers.host,
    }

    // Brand new user.
    const feedback = new Feedback({
       title: data.title.trim(),
       email: data.email.trim(),
       text: data.text,
       device_data: data.device_data,
       user_data: user_data
    });

    // Save final user.
    return feedback
    .save()
    .then((document) => success(response, 201, { message: 'Document successfully created.', document}))
    .catch((err) => error(response, 500, err.message));
}

/**
 * Returns a single document form the Feedback collection.
 * @param request 
 * @param response 
 */
const deleteOne = async (request: Request, response: Response) => {

    const id: string = String(request.params.id);

    // Return document matching id.
    return await Feedback
    .findByIdAndRemove(id)
    .then((document) => success(response, 200, document))
    .catch((err) => error(response, 500, err.message));
}

export {
    create,
    deleteOne,
    findAll,
    findOne,
}