import InterfaceUser from '../../../lib/interfaces/user.interface';
import created from './created';
import deleted from './deleted';

// Welcome email; account created.
export const WelcomeEmail = (data: InterfaceUser) => {
    return {
        Charset: "UTF-8",
        Data: created(data),
    }
}

// Goodbye email; account deleted.
export const GoodByeEmail = (data: InterfaceUser) => {
    return {
        Charset: "UTF-8",
        Data: deleted(data),
    }
}
