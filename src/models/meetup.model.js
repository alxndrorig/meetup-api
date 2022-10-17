class MeetupModel {
  constructor({ title, description, keywords, date, location }) {
    this.title = title;
    this.description = description ?? '';
    this.keywords = keywords ?? [];
    this.date = date;
    this.location = location;
  }
}

export default MeetupModel;
