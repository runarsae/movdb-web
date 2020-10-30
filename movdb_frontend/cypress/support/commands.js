Cypress.Commands.add("login", () => {
    cy.fixture("user").then((user) => {
        cy.visit("/");
        cy.get("button[aria-label='log in']").click();
        cy.get("input[placeholder='Username']").type(user.username);
        cy.get("input[placeholder='Password']").type(user.password + "{enter}");
        cy.contains("Login successful. Welcome, " + user.username + "!");
    });
});

Cypress.Commands.add("search", (search) => {
    cy.get("input[aria-label='search movdb']")
        .clear()
        .type(search + "{enter}");
});
