class User {
  constructor(
    firstName,
    lastName,
    age,
    description,
    profilePhoto,
    username,
    password,
    cv,
    skills,
    address,
    phoneNumber,
    email,
    // links could be empty array for later
    links
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.description = description;
    this.profilePhoto = profilePhoto;
    this.username = username;
    this.password = password;
    this.cv = cv;
    this.skills = skills;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.links = links;
  }
}

module.exports = User;
