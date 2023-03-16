import { Request, Response } from 'express';
import { success, error } from '../../../utils/http-responses';
import { searchAll } from './search.handler';
import sanitazier from '../../../helpers/string/cleaner';

/**
 * Search with lang
 * @param request 
 * @param response 
 */
const search = (request: Request, response: Response) => {

    const lang: string = request.params.lang;
    const search: string = request.query.search;

    if (!search || !lang) {
        return error(response, 500, 'Data Missing');
    }

    const searchClean: string = sanitazier(search);
    const $regex = new RegExp(searchClean, 'i');
    
    return searchAll($regex)
    .then((data) => success(response, 200, data))
    .catch((err) => error(response, 500, err.message));
}

export {
    search
}
