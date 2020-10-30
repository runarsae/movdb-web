describe("Page loads", () => {
    it("Webpage loads", () => {
        cy.visit("/");
        cy.contains("MovDB");
    });

    it("Has movies", () => {
        cy.get(".MuiCardMedia-root");
        cy.get(".makeStyles-video-43");
    });
});
