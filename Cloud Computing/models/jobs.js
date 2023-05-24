class Jobs {
  constructor(
    id,
    jobTitle,
    description,
    qualifications,
    companyName,
    address,
    contacts
  ) {
    this.id = id;
    this.jobTitle = jobTitle;
    this.description = description;
    this.qualifications = qualifications;
    this.companyName = companyName;
    this.address = address;
    this.contacts = contacts;
  }
}

module.exports = Jobs;
