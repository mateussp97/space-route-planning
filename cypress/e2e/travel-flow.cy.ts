describe("Travel Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the current location with the correct planet", () => {
    cy.get(
      '[data-testid="components.screens.home.form.current-location"]'
    ).should("be.visible");
    cy.get(
      '[data-testid="components.screens.home.form.current-location"]'
    ).within(() => {
      cy.get("span").contains("Jupiter");
    });
  });

  it("should display the map with planets, refueling stations and the spaceship image on the current planet", () => {
    cy.verifySpaceshipPosition("jupiter");
  });

  it("should display information before selecting a value for the destination field", () => {
    cy.get(
      '[data-testid="components.screens.home.informations.fuel-available-value"]'
    ).contains("90,000 Liters (100.00%)");
    cy.get(
      '[data-testid="components.screens.home.informations.nearest-refueling-station-value"]'
    ).within(() => {
      cy.get("img").should("have.attr", "src").and("include", "/earth.svg");
      cy.contains("Earth");
    });
  });

  it("should allow selecting a destination planet", () => {
    cy.selectDestination("mars");
    cy.get('[data-testid="components.screens.home.form.destination"]').within(
      () => {
        cy.get("span").contains("Mars");
      }
    );
  });

  it("should display information after selecting a value for the destination field", () => {
    cy.selectDestination("mars");

    cy.get(
      '[data-testid="components.screens.home.informations.required-fuel-value"]'
    ).contains("35,000 Liters");
    cy.get(
      '[data-testid="components.screens.home.informations.can-you-travel-value"]'
    ).contains("Yes");
  });

  it("should enable the submit button when a destination is selected", () => {
    cy.selectDestination("mars");

    cy.get('[data-testid="components.screens.home.form.submit-trip"]').should(
      "not.be.disabled"
    );
  });

  it("should start the journey when the submit button is clicked", () => {
    cy.selectDestinationAndSubmit("mars");

    cy.verifySpaceshipPosition("mars");
  });

  it("should update the travel history after a trip", () => {
    cy.selectDestinationAndSubmit("mars");

    cy.verifySpaceshipPosition("mars");

    cy.get(
      '[data-testid="components.screens.home.travel-history.history-list"]'
    ).should("be.visible");
    cy.get(
      '[data-testid="components.screens.home.travel-history.history-list.history-list-item-0"]'
    ).within(() => {
      cy.get(
        '[data-testid="components.screens.home.travel-history.history-list.history-list-item-0-from"]'
      ).contains("Jupiter");
      cy.get(
        '[data-testid="components.screens.home.travel-history.history-list.history-list-item-0-to"]'
      ).contains("Mars");
      cy.get(
        '[data-testid="components.screens.home.travel-history.history-list.history-list-item-0-fuel-before-travel"]'
      ).contains("90,000 Liters");
      cy.get(
        '[data-testid="components.screens.home.travel-history.history-list.history-list-item-0-spent-fuel"]'
      ).contains("35,000 Liters");
    });
  });

  it("should update the spaceship image on the map after the trip is submitted", () => {
    cy.selectDestinationAndSubmit("mars");

    cy.verifySpaceshipPosition("mars");
  });

  it("should display the refuel alert button on Saturn after the trip, because you're on a planet with a fuel station", () => {
    cy.selectDestinationAndSubmit("saturn");

    cy.verifySpaceshipPosition("saturn");

    cy.get(
      '[data-testid="components.screens.home.refuel-alert.refuel-button"]'
    ).contains("Refuel the spaceship");
  });

  it("should display the refuel alert button on Jupiter after the trip, because you became isolated", () => {
    cy.selectDestinationAndSubmit("saturn");

    cy.verifySpaceshipPosition("saturn");

    cy.get(
      '[data-testid="components.screens.home.refuel-alert.refuel-button"]'
    ).click();

    cy.selectDestinationAndSubmit("jupiter");

    cy.verifySpaceshipPosition("jupiter");

    cy.get(
      '[data-testid="components.screens.home.refuel-alert.refuel-button"]'
    ).contains("Ask for help");
  });

  it("should display the emergency refuel alert button and refuel the spaceship", () => {
    cy.selectDestinationAndSubmit("saturn");

    cy.verifySpaceshipPosition("saturn");

    cy.get('[data-testid="components.screens.home.refuel-alert.refuel-button"]')
      .contains("Refuel the spaceship")
      .click();

    cy.get(
      '[data-testid="components.screens.home.informations.fuel-available-value"]'
    ).contains("90,000 Liters (100.00%)");
  });

  it("should display an error toast when trying to travel without enough fuel", () => {
    cy.selectDestinationAndSubmit("saturn");

    cy.verifySpaceshipPosition("saturn");

    cy.selectDestinationAndSubmit("jupiter");

    cy.verifySpaceshipPosition("saturn");

    cy.get('[data-testid="components.ui.toaster.title"]').contains(
      "Trip Not Possible: from Saturn to Jupiter"
    );
  });
});
