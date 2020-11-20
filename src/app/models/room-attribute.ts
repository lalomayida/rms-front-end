export class RoomAttribute {
    id: number;
    name: String;
    quantity: number;

    constructor(
        __id: number,
        __name: String,
        __quantity: number
    ) {
        this.id = __id;
        this.name = __name;
        this.quantity = __quantity;
    }
}