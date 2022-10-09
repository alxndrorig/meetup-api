export class MeetupDTO{
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.keywords = obj.keywords;
        this.date = obj.date;
        this.location = this.location;
    }
}