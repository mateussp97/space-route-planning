/// <reference types="cypress" />

import { planets } from "@/utils/constants";

declare global {
  namespace Cypress {
    interface Chainable {
      selectDestination(planet: string): Chainable<void>;
      selectDestinationAndSubmit(planet: string): Chainable<void>;
      verifyLanguageDropdown(imgPath: string, label: string): Chainable<void>;
      verifySpaceshipPosition(destination: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("selectDestination", (planet) => {
  cy.get('[data-testid="components.screens.home.form.destination"]').click();
  cy.get(
    `[data-testid="components.screens.home.form.destination-planet-${planet}"]`
  ).click();
});

Cypress.Commands.add("selectDestinationAndSubmit", (planet) => {
  cy.selectDestination(planet);
  cy.get('[data-testid="components.screens.home.form.submit-trip"]').click();
});

Cypress.Commands.add("verifyLanguageDropdown", (imgPath, label) => {
  cy.get(
    '[data-testid="components.screens.home.header.language-dropdown.language-dropdown-trigger"]'
  ).within(() => {
    cy.get("img").should("have.attr", "src").and("include", imgPath);
    cy.contains(label);
  });
});

Cypress.Commands.add("verifySpaceshipPosition", (destination) => {
  cy.get('[data-testid="components.screens.home.map.map"]').should(
    "be.visible"
  );

  planets.forEach((planet) => {
    const planetTestId = `components.screens.home.map.map.${planet.name}`;

    cy.get(`[data-testid="${planetTestId}"]`).within(() => {
      cy.get(`[data-testid="${planetTestId}-icon"]`).should("be.visible");

      if (planet.name === destination) {
        cy.get(
          `[data-testid="components.screens.home.map.spaceship-img.${planet.name}"]`
        ).should("be.visible");
      }
    });
  });
});
