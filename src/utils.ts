import { Person } from "./Person";

export const getNames = (persons: Person[] = []): string[] => {
  return persons.map((person) => {
    return person.name;
  });
}
