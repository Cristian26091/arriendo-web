export class Faq {

    constructor(_id = '', question = '', response = ''){
        this._id = _id;
        this.question = question;
        this.response = response;
    }

    _id: string;
    question: string;
    response: string;
}