import { User } from './user';

export class Comment {
    id: number;
    comment: String;
    user: User;
    submit_date: Date;

    constructor(
        __id: number,
        __comment: String,
        __user: User,
        __submit_date: Date
    ) {
        this.id = __id;
        this.comment = __comment;
        this.user = __user;
        this.submit_date = __submit_date;
    }
}