export class MeetupDTO {
  constructor({ id, title, description, keywords, date, location }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.keywords = keywords;
    this.date = date;
    this.location = location;
  }
}
