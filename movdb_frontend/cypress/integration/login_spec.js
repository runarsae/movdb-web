describe("Login", () => {
    it("Log in", () => {
        cy.login();
        cy.fixture("user").then((user) => {
            cy.contains("Login successful. Welcome, " + user.username + "!");
        });
    });
});
