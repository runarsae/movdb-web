describe("Sort", () => {
    before(() => {
        cy.visit("/");
    });

    beforeEach(() => {
        cy.get("button[aria-label='sorting']").click();
    });

    it("Sort by runtime", () => {
        cy.contains("Runtime").click();

        cy.get(".MuiCardMedia-root").first().click();
        cy.get("button[aria-label='show more']").click();
        cy.get("#runtime").then(($runtime1) => {
            const runtime1 = parseInt($runtime1.text());

            cy.get("button[aria-label='close']").click();

            cy.get(".MuiCardMedia-root").last().click();
            cy.get("button[aria-label='show more']").click();

            cy.get("#runtime").then(($runtime2) => {
                const runtime2 = parseInt($runtime2.text());

                expect(runtime1).to.be.greaterThan(runtime2);
                cy.get("button[aria-label='close']").click();
            });
        });
    });

    it("ASC/DESC", () => {
        cy.get(".spec")
            .first()
            .then(($ratingDESC) => {
                const ratingDESC = parseInt($ratingDESC.text());

                cy.contains("ASC").click();

                cy.get(".spec")
                    .first()
                    .then(($ratingASC) => {
                        const ratingASC = parseInt($ratingASC.text());

                        expect(ratingDESC).to.be.greaterThan(ratingASC);
                    });
            });
    });
});
