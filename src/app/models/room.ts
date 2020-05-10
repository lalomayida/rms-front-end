import { RoomType } from './room-type';
import { RoomAttribute } from './room-attribute';

export class Room {
    id: number;
    type: RoomType;
    name: String;
    capacity: number;
    width: String;
    length: String;
    is_visible: boolean;
    attribute: RoomAttribute[];

    constructor(
        __id: number,
        __type: RoomType,
        __name: String,
        __capacity: number,
        __width: String,
        __length: String,
        __is_visible: boolean,
        __attribute: RoomAttribute[]
    ) {
        this.id = __id;
        this.type = __type;
        this.name = __name;
        this.capacity = __capacity;
        this.width = __width;
        this.length = __length;
        this.is_visible = __is_visible;
        this.attribute = __attribute;
    }
}