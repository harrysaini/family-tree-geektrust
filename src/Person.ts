export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface IPersonMainRelations {
  mother?: Person;
  spouse?: Person
  children?: Person[];
}

/**
 * Person class
 */
export class Person {
  name: string;
  gender: string;
  relations: IPersonMainRelations;

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
    this.relations = (gender === GENDER.FEMALE) ? { children: [] } : {};
  }

  /**
   * Set spouse of person
   * @param spouse
   */
  setSpouse(spouse: Person) {
    // reverse mapping on both objects
    this.relations.spouse = spouse;
    spouse.relations.spouse = this;
  }

  /**
   * Add children to mother person
   * @param name
   * @param gender
   * @param family
   */
  addChildren(name: string, gender: string, family: Family) {
    if (this.gender === GENDER.MALE) {
      throw new Error('CHILD_ADDITION_FAILED');
    }
    const child = family.createPerson(name, gender);
    child.relations.mother = this;
    this.relations.children && this.relations.children.push(child);
    return child;
  }
}

interface IPersonMap {
  [key: string]: Person
}

/** Factory for creating person in a famliy */
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
