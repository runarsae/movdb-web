describe("Movie popup", () => {
    it("Open movie", () => {
        cy.visit("/");
        cy.get(".MuiCardMedia-root").first().click();
        cy.get(".MuiCardHeader-title");
    });

    it("Like movie when not logged in", () => {
        cy.get("button[aria-label='add to favorites']").click();
        cy.get("button[aria-label='add to favorites']").not(".MuiIconButton-colorPrimary");
        cy.contains("Log in to favorite movies.");
    });

    it("Like/unlike movie when logged in", () => {
        cy.login();
        cy.get(".MuiCardMedia-root").first().click();
        cy.get("#likesCount").then(($likes1) => {
            const expected = parseInt($likes1.text()) + 1;

            cy.get("button[aria-label='add to favorites']").click();
            cy.get("button[aria-label='add to favorites']").should("have.class", "MuiIconButton-colorPrimary");

            cy.get("#likesCount").then(($likes2) => {
                const actual = parseInt($likes2.text());

                expect(expected).to.equal(actual);
            });
        });

        cy.get("#likesCount").then(($likes1) => {
            const expected2 = parseInt($likes1.text()) - 1;

            cy.get("button[aria-label='add to favorites']").click();
            cy.get("button[aria-label='add to favorites']").should("not.have.class", "MuiIconButton-colorPrimary");

            cy.get("#likesCount").then(($likes2) => {
                const actual2 = parseInt($likes2.text());

                expect(expected2).to.equal(actual2);
            });
        });
    });

    it("Close movie", () => {
        cy.get("button[aria-label='close']").click();
    });
});
