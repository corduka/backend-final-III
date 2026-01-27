
class UserDTO {
    constructor(user) {
        // user is the Mongoose document or plain object from the DB/DAO
        this.id = user._id || user.id;
        this.firstName = user.first_name;
        this.lastName = user.last_name;
        this.email = user.email;
        this.role = user.role;
        // Exclude sensitive fields like password
    }
}

export default UserDTO;