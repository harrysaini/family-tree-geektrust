import { GetRelatives } from "./getRelatives";
import { Family } from "./Family";

export enum RELATIONS {
  PATERNAL_UNCLE = 'Paternal-Uncle',
  MATERNAL_UNCLE = 'Maternal-Uncle',
  PATERNAL_AUNT = 'Paternal-Aunt',
  MATERNAL_AUNT = 'Maternal-Aunt',
  SISTER_IN_LAW = 'Sister-In-Law',
  BROTHER_IN_LAW = 'Brother-In-Law',
  SON = 'Son',
  DAUGHTER = 'Daughter',
  SIBLINGS = 'Siblings'
}


export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female'
}

export interface IPersonMainRelations {
  mother?: Person;
  spouse?: Person
  children?: Person[];
}


interface IRelativesGetter extends Record<RELATIONS, (person: Person) => Person[]> {
}


class RelativesGetter implements IRelativesGetter {
  [RELATIONS.PATERNAL_UNCLE] = (person: Person) => {
    return GetRelatives.getFatherSiblings(person, GENDER.MALE);
  }
  [RELATIONS.PATERNAL_AUNT] = (person: Person) => {
    return GetRelatives.getFatherSiblings(person, GENDER.FEMALE);
  }
  [RELATIONS.MATERNAL_AUNT] = (person: Person) => {
    return GetRelatives.getMotherSiblings(person, GENDER.FEMALE);
  }
  [RELATIONS.MATERNAL_UNCLE] = (person: Person) => {
    return GetRelatives.getMotherSiblings(person, GENDER.MALE);
  }
  [RELATIONS.SISTER_IN_LAW] = (person: Person) => {
    return GetRelatives.getInLaws(person, GENDER.FEMALE, GENDER.MALE);
  }
  [RELATIONS.BROTHER_IN_LAW] = (person: Person) => {
    return GetRelatives.getInLaws(person, GENDER.MALE, GENDER.FEMALE);
  }
  [RELATIONS.SON] = (person: Person) => {
    return GetRelatives.getChildren(person, GENDER.MALE);
  }
  [RELATIONS.DAUGHTER] = (person: Person) => {
    return GetRelatives.getChildren(person, GENDER.FEMALE);
  }
  [RELATIONS.SIBLINGS] = (person: Person) => {
    return GetRelatives.getSiblings(person);
  }
}


/**
 * Person class
 */
export class Person extends RelativesGetter{
  name: string;
  gender: string;
  relations: IPersonMainRelations;

  constructor(name: string, gender: string) {
    super();
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

  getRelatives = (relation: RELATIONS): Person[] => {
    if (!this[relation]) {
      throw new Error('UNSUPPORTED_RELATION')
    }
    return this[relation](this);
  }
}
