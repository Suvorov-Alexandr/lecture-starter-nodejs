import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights
  create(body) {
    const fight = fightRepository.create(body);
    if (!fight) {
      // return null;
      throw new Error(`The fight ${body} has not been created.`);
    }
    return fight;
  }
}

const fightersService = new FightersService();

export { fightersService };
