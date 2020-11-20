import { Room } from './room';
import { User } from './user';
import { Department } from './department';
import { Status } from './status';
import { Need } from './need';
import { Agent } from './agent';
import { Comment } from './comment'

export class Requisition {
    id: number;
    room: Room;
    user: User;
    agent: Agent;
    deparment: Department;
    description: String;
    initialDate: Date;
    finalDate: Date;
    status: Status;
    comment: Comment[];
    need: Need[];

    constructor(
        __id: number,
        __room: Room,
        __user: User,
        __agent: Agent,
        __deparment: Department,
        __description: String,
        __initialDate: Date,
        __finalDate: Date,
        __status: Status,
        __comment: Comment[],
        __need: Need[]
    ) {
        this.id = __id;
        this.room = __room;
        this.user = __user;
        this.agent = __agent;
        this.deparment = __deparment;
        this.description = __description;
        this.initialDate = __initialDate;
        this.finalDate = __finalDate;
        this.status = __status;
        this.comment = __comment;
        this.need = __need;
    }
}