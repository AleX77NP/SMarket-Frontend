export class UserMessage {
    nameSurname: string;
    email: string;
    subjectUser: string;
    messageUser: string;

    constructor(nameSurname:string, email:string, subjectUser:string, messageUser: string) {
        this.nameSurname=nameSurname;
        this.email=email;
        this.subjectUser=subjectUser;
        this.messageUser=messageUser;
    }
}
