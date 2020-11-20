import { Role } from './role';

export class User {
    id: number;
    role: Role;
    expedient_number: String;
    password: String;
    name: String;
    surname: String;
    mail: String;
    is_visible:boolean;

    constructor(
        __id: number,
        __role: Role,
        __expedient_number: String,
        __password: String,
        __name: String,
        __surname: String,
        __mail: String,
        __is_visible:boolean
    ) {
        this.id = __id;
        this.role = __role;
        this.expedient_number = __expedient_number;
        this.password = __password;
        this.name = __name;
        this.surname = __surname;
        this.mail = __mail;
        this.is_visible = __is_visible
    }
}