// we are not using this file

class Job {
  constructor(
    userId,
    jobTitle,
    description,
    qualifications,
    companyName,
    address,
    contacts
  ) {
    this.userId = userId;
    this.jobTitle = jobTitle;
    this.description = description;
    this.qualifications = qualifications;
    this.companyName = companyName;
    this.address = address;
    this.contacts = contacts;
  }
}

module.exports = Job;
