import { Person } from "./Person";


interface IPersonMap {
  [key: string]: Person
}


/** Class for representing  a famliy */
export class Family {
  persons: IPersonMap = {};

  /**
   * Create new person
   * @param name
   * @param gender
   */
  createPerson(name: string, gender: string) {
    let person = this.persons[name];
    if (person) {
      throw new Error(`DUPLICATE_ENTRY`);
    }
    person = new Person(name, gender);
    this.persons[name] = person;
    return person;
  }

  /**
   * Get person by name
   * @param name
   */
  getPerson(name: string) {
    const person = this.persons[name];
    if (!person) {
      throw new Error(`PERSON_NOT_FOUND`);
    }
    return person;
  }
}
