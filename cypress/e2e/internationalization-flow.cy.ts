describe("Internationalization Flow", () => {
  it("should display the language dropdown with English selected by default when access /", () => {
    cy.visit("http://localhost:3000");

    cy.get(
      '[data-testid="components.screens.home.header.language-dropdown.language-dropdown-trigger"]'
    ).should("be.visible");

    cy.verifyLanguageDropdown("/estados-unidos.png", "English");
  });

  it("should display the language dropdown with Portuguese selected by default when access /pt", () => {
    cy.visit("http://localhost:3000/pt");

    cy.get(
      '[data-testid="components.screens.home.header.language-dropdown.language-dropdown-trigger"]'
    ).should("be.visible");

    cy.verifyLanguageDropdown("/brasil.png", "Português");
  });

  it("should change the language to Portuguese when selected", () => {
    cy.visit("http://localhost:3000/en");

    cy.get(
      '[data-testid="components.screens.home.header.language-dropdown.language-dropdown-trigger"]'
    ).click();

    cy.contains("Portuguese").click();

    cy.url().should("include", "/pt");

    cy.verifyLanguageDropdown("/brasil.png", "Português");
  });
});
