import { Request, Response } from 'express';

import { Missing } from "../../models";
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
    const count = await Missing.find().estimatedDocumentCount();
    
    // Retun documents in desc order.
    return await Missing
    .find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt: 'desc'})
    .then((document) => success(response, 200, {count, document}))
    .catch((err) => error(response, 500, err.message));
}

/**
  * Creates a new document and stores it.
  * @param request 
  * @param response 
  */
const create = async(request: Request, response: Response) => {

    const data = request.body;

    // Brand new user.
    const missingEmoji = new Missing({
       name: data.name,
    });

    // Save final user.
    return missingEmoji
    .save()
    .then((document) => success(response, 201, { message: 'Document successfully created.', document}))
    .catch((err) => error(response, 500, err.message));
}

export {
    create,
    findAll,
}