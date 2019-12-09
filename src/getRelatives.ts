import { Person, GENDER } from "./Person";


export class GetRelatives {

  static filterByGender(persons: Person[], gender: string): Person[] {
    // filter by gender
    const filteredSiblings = persons.filter((sibling) => {
      return sibling.gender === gender;
    });
    return filteredSiblings;
  }


  static getSiblings(person: Person, gender?: string): Person[] {
    const mother = person.relations.mother;
    if (!mother) return [];
    const siblings = mother.relations.children;
    if(!siblings) return [];
    const skipSelfSiblings = siblings.filter((sibling) => {
      return sibling !== person;
    });

    if(!gender) {
      return skipSelfSiblings;
    }
    return this.filterByGender(skipSelfSiblings, gender);

  }

  static getFatherSiblings(person: Person, gender: string): Person[] {
    const mother = person.relations.mother;
    if (!mother) return [];
    const father = mother.relations.spouse;
    if (!father) return [];
    const fatherSiblings = this.getSiblings(father, gender);
    return fatherSiblings;
  }

  static getMotherSiblings(person: Person, gender: string): Person[]  {
    const mother = person.relations.mother;
    if (!mother) return [];
    const motherSiblings = this.getSiblings(mother, gender);
    return motherSiblings;
  }

  static inLawsSpouseSide(person: Person, siblingGender: string): Person[] {
    const spouse = person.relations.spouse;
    if(!spouse) return [];
    const spouseSiblings = this.getSiblings(spouse, siblingGender);
    return spouseSiblings;
  }

  static inLawsOwnSide(person: Person, siblingGender: string): Person[] {
    const siblings = this.getSiblings(person, siblingGender);
    const inLaws: Person[] = [];
    siblings.forEach((sibling) => {
      if(sibling.relations.spouse) {
        inLaws.push(sibling.relations.spouse);
      }
    });
    return inLaws;
  }

  static getInLaws(person: Person, spouseSiblingsGender: string, ownSiblingsGender: string):Person[] {
    const fromSpouseSide = this.inLawsSpouseSide(person, spouseSiblingsGender);
    const fromOwnSide = this.inLawsOwnSide(person, ownSiblingsGender);
    return [...fromOwnSide, ...fromSpouseSide];
  }

  static getChildren(person: Person, gender: string){
    let mother: Person | undefined = person;
    if(person.gender === GENDER.MALE) {
      mother = person.relations.spouse;
    }
    if(!mother) {
      return [];
    }
    const children = mother.relations.children;
    if(!children) return [];
    return this.filterByGender(children, gender);
  }

}


