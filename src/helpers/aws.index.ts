import {config, Credentials} from 'aws-sdk';
import { AWS_ACCESS_KEY, AWS_ACCESS_SECRET } from '../utils';

config.update({region:'us-east-1'});
config.credentials = new Credentials(
   AWS_ACCESS_KEY,
   AWS_ACCESS_SECRET,
);

import emailService from './aws/simpleEmailService';
import translationService from './aws/translation';

export {
   emailService,
   translationService
}
