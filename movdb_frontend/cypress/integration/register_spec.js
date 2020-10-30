describe("Register", () => {
    it("Register error messages", () => {
        cy.visit("/");
        cy.get("button[aria-label='log in']").click();
        cy.contains("Register").click();
        cy.contains("button", "Register").click();

        cy.contains("Please enter username.");
        cy.contains("Please enter password.");
        cy.contains("Please confirm password.");

        cy.get("input[placeholder='Username']").type("test");

        cy.get("input[placeholder='Password']").type("password");
        cy.get("input[placeholder='Confirm password']").type("non-matching password");
        cy.contains("Passwords does not match.");

        cy.get("input[placeholder='Confirm password']").clear().type("password");
        cy.contains("Passwords does not match.").should("not.exist");

        cy.contains("Please enter username.").should("not.exist");
        cy.contains("Please enter password.").should("not.exist");
        cy.contains("Please confirm password.").should("not.exist");

        cy.contains("button", "Register").click();
        cy.contains("User already exists.");
    });
});
