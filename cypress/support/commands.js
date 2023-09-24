Cypress.Commands.add(
  "addNewUser",
  (id, username, firstName, lastName, email, password, phone, userStatus) => {
    cy.request("POST", "/user", {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      userStatus: userStatus,
    });
  }
);
