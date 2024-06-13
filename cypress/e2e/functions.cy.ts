import { planetDistances, planets } from "@/utils/constants";
import { formatNumber, getDistance, getPlanetIcon } from "@/utils/functions";

describe("Utility Functions", () => {
  it("should return the correct distance between planets", () => {
    expect(getDistance("mercury", "venus")).equals(
      planetDistances["mercury_venus"]
    );
    expect(getDistance("earth", "mars")).equals(planetDistances["earth_mars"]);
    expect(getDistance("jupiter", "saturn")).equals(
      planetDistances["jupiter_saturn"]
    );
  });

  it("should return the correct icon for each planet", () => {
    planets.forEach((planet) => {
      expect(getPlanetIcon(planet.name)).equals(planet.icon);
    });
  });

  it("should format numbers correctly for different languages", () => {
    expect(formatNumber(12345.678, "en")).equals("12,345.678");
    expect(formatNumber(12345.678, "pt")).equals("12.345,678");
  });
});
