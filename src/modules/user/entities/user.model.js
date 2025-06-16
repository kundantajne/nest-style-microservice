class User {
  constructor({ id, name, email, created_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
  }
}

module.exports = User;
