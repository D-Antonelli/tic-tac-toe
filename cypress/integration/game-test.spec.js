describe("e to e test", () => {
it("Visits page", () => {
    cy.visit("/")
});
it("Make a first move", () => {
    cy.get('[aria-label="make next move"]:first').click()
})
it("X is visible after first move", () => {
    cy.contains(/(^X$)/);
});
it("Next player should be O", () => {
    cy.contains(/next player: O/i)
})
it("Make a second move", () => {
    cy.get('[aria-label="make next move"]:last').click();
})
it("O is visible after second move", () => {
    cy.contains(/(^O$)/);
})
it("Next player should be X", () => {
  cy.contains(/next player: X/i);
});
it("Click restart button", () => {
    cy.contains(/restart/i).click()
})
it("Game board does not contain moves after restart", () => {
    cy.contains(/(^X$)/).should("not.exist")
    cy.contains(/(^O$)/).should("not.exist")
})
});
