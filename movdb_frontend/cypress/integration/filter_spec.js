describe("Filter", () => {
    it("Filter on genres and production countries", () => {
        cy.visit("/");
        cy.get("button[aria-label='filtering']").click();
        cy.contains("Confirm");
        cy.contains("Genres").parent().click();
        cy.contains("TV Movie").click().type("{esc}");
        cy.contains("Production").parent().click();
        cy.contains("United States of America").click().type("{esc}");
        cy.contains("Confirm").click();
        cy.get("div[title='High School Musical']");
    });
});
