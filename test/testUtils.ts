import { Family, Person } from "../src/Person";
import { getNames as _getNames } from "../src/utils";

export const getPersonBulk = (family: Family, personsNames: string[]): Person[] => {
  const persons = personsNames.map((name) => {
    return family.getPerson(name);
  });
  return persons;
}


export const getNames = _getNames;