export const meetup = class Meetup {
    constructor(id, title, description, keywords, time, place) {
        this.id = id;
        this.title = title;
        this.description = description ?? '';
        this.keywords = keywords ?? [];
        this.time = time;
        this.place = place;
    }
}