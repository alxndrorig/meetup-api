import bcrypt from 'bcrypt';

class User {
  constructor({ id, name, email, password, salt, hash, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.salt = salt ?? bcrypt.genSaltSync(10);
    this.hash = hash ?? bcrypt.hashSync(password, this.salt);
    this.role = role ?? 'user';
  }
}

export default User;
