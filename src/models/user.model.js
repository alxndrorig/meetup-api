import bcrypt from "bcrypt";

class User {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.salt = obj.salt ?? bcrypt.genSaltSync(10);
        this.hash = obj.hash ?? bcrypt.hashSync(obj?.password, this.salt);
        this.role = obj.role ?? 'user';
    }
}

export default User;