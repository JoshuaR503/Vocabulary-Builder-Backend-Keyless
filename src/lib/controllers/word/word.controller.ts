import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { success, error } from '../../../utils/http-responses';
import { Word } from '../../models';

import { 
   updateWordService, 
   createWordService, 
   updateWordAudioService
} from '../../services';

import { TOKEN_SEED } from '../../../utils';
import { removeAduio } from '../../../helpers/audio';

export default class WordController {
   
   /**
    * Counts all documents from the Word collection.
    * @param request 
    * @param response 
    */
   public async countAll(request: Request, response: Response) {
      return await Word
      .estimatedDocumentCount()
      .then((count) => success(response, 200, count))
      .catch((error) => error(response, 500, 'Uknown error while counting documents.'));
   }

   /**
    * Counts all documents from a specific category in the Word collection.
    * @param request 
    * @param response 
    */
   public async countPerCategory(request: Request, response: Response) {

      const category: string = String(request.query.category);
      
      if (!category) {
         error(response, 500, 'Data Missing');
      }

      return await Word
      .find({'EN.category': category})
      .countDocuments()
      .then((count) => success(response, 200, count))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Counts all documents from a specific level in the Word collection.
    * @param request 
    * @param response 
    */
   public async countPerLevel(request: Request, response: Response) {

      const level: string = String(request.query.level);
      
      if (!level) {
         error(response, 500, 'Data Missing');
      }

      return await Word
      .find({'level': level})
      .countDocuments()
      .then((count) => success(response, 200, count))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Returns all documents from the Word collection.
    * @param request 
    * @param response 
    */
   public async findAll(request: Request, response: Response) {

      // Params
      const skip: number = Number(request.query.skip);
      const limit: number = Number(request.query.limit);

      // Meta data
      const count = await Word.find().estimatedDocumentCount();
      const visible = await Word
      .find({})
      .where('visible', true)
      .countDocuments();
      
      return await Word
      .find()
      .skip(skip)
      .limit(limit)
      .sort({createdAt: 'desc'})
      .populate('writter', 'name role')
      .then((document) => success(response, 200, {count, visible, document}))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Returns a single document form the Word collection.
    * @param request 
    * @param response 
    */
   public async findOne(request: Request, response: Response) {

      const id: string = String(request.params.id);

      return await Word
      .findById(id)
      .populate('writter', 'name role')
      .then((document) => success(response, 200, document))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Creates a new document.
    * @param request 
    * @param response 
    */
   public async create(request: Request, response: Response) {

      const data = request.body;

      const token = request.header('x-authorization-token');
      const payload: any = verify(token, TOKEN_SEED);
      const writerId: string = payload.document._id;

      return await createWordService(data, writerId)
      .then(document => success(response, 201, document))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Updates an existing document.
    * @param request 
    * @param response 
    */
   public async update(request: Request, response: Response) {
      const data = request.body;
      const id = request.params.id;

      return await updateWordService(id, data)
      .then(document => success(response, 204, document))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Updates an existing document.
    * @param request 
    * @param response 
    */
   public async updateAudio(request: Request, response: Response) {

      const data = request.body;
      const id = request.params.id;

      return await updateWordAudioService(id, data)
      .then(document => success(response, 204, document))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Deletes an existing document.
    * @param request 
    * @param response 
    */
   public async delete(request: Request, response: Response) {
      
      const id: string = String(request.params.id);

      const document = await Word.findById(id);
      const fileName = `${document.EN.word}-${document.ES.word}`;

      await removeAduio(fileName);
      await removeAduio(document.EN.word);

      return await Word
      .findByIdAndRemove(id)
      .then(() => success(response, 202, 'Data deleted Successfully'))
      .catch((err) => error(response, 500, err.message));
   }

   /**
    * Deletes all documents from the Word collection.
    * This is not meant to be used in production.
    * @param request 
    * @param response 
    */
   public async deleteMany(request: Request, response: Response) {
      return await Word
      .deleteMany({})
      .then((document) => success(response, 202, document.n))
      .catch((err) => error(response, 500, err.message));
   }
}
