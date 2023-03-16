import axios from 'axios';
import { Request, Response } from 'express';

import { SENTRY_API_KEY } from '../../../utils';
import { error, success } from '../../../utils/http-responses';

// Sentry API url.
const url = `https://sentry.io/api/0/projects/---`;

// Data headers.
const headers = {
    'Content-Type': 'application/json',
    'Authorization': SENTRY_API_KEY,
}

/**
 * Sends all issues from all the different endpoints.
 * @param request 
 * @param response 
 */
const issuesReport = (request: Request, response: Response) => {
    return axios.all([
        axios.get(`${url}/admin/issues/`, {headers}),
        axios.get(`${url}/server/issues/`, {headers})
    ])
    .then(axios.spread((admin, server) => {
        return response.status(200).json({
            success: true,
            projects: {
                server: server.data,
                admin: admin.data
            }
        });
    }))
    .catch((err) => error(response, 503, err));
}

/**
 * Sends all issues from all the different endpoints.
 * @param request 
 * @param response 
 */
const deleteIssue = (request: Request, response: Response) => {

    const issue_id: string = request.params.issue_id;

    return axios
    .delete(`https://sentry.io/api/0/issues/${issue_id}/`, {headers})
    .then(() => success(response, 202, 'Data deleted'))
    .catch((err) => error(response, 503, err));
}

export {
    issuesReport,
    deleteIssue
}
