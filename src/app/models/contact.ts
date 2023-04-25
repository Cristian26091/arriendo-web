export class Contact {

    constructor(_id = '', name = '', email = '', description= ''){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.description = description;
    }

    _id: string;
    name: string;
    email: string;
    description: string;
}
