describe("Search", () => {
    it("No results", () => {
        cy.visit("/");
        cy.search("no movies for this search");
        cy.contains("NO RESULTS");
    });

    it("Search", () => {
        cy.search("Thor");
        cy.contains("RESULTS");

        cy.search("Thor: Ragnarok");
        cy.get(".MuiCardMedia-root").should("have.attr", "title", "Thor: Ragnarok");
    });
});
