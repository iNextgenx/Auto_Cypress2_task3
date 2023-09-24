describe("pet store api User tests", () => {
  const id = 445566;
  const username = "EGORIK";
  const firstName = "Egor";
  const lastName = "Smirnov";
  const email = "egor@email.ru";
  const password = "pass123";
  const phone = "+79991234567";
  const userStatus = 0;

  it("should test new User creation", () => {
    cy.addNewUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    ).then((response) => {
      expect(response.status).to.eq(200);
      cy.request("GET", `/user/${username}`).then((response) => {
        expect(response.body).be.eql({
          id: id,
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
          userStatus: userStatus,
        });
      });
    });
  });

  it("should test User update", () => {
    cy.addNewUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    );
    cy.request("PUT", `/user/${username}`, {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: "updated@email.ru",
      password: password,
      phone: "+79212222222",
      userStatus: 555,
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.request("GET", `/user/${username}`).then((response) => {
        expect(response.body).be.eql({
          id: id,
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: "updated@email.ru",
          password: password,
          phone: "+79212222222",
          userStatus: 555,
        });
      });
    });
  });

  it("should test User deletion", () => {
    cy.addNewUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    );
    cy.request("GET", `/user/${username}`);
    cy.request("DELETE", `/user/${username}`).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.request({ url: `/user/${username}`, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).be.eq(404);
      }
    );
  });
});
