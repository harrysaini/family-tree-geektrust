export enum GENDER {
  MALE = 'male',
  FEMALE = 'female'
}

export interface IPersonMainRelations {
    mother?: Person;
    spouse?: Person
    children: Person[];
}


export class Person {
    name: string;
    gender: string;
    relations: IPersonMainRelations = {
        children: []
    };

    constructor(name: string, gender: string) {
        this.name = name;
        this.gender = gender;
    }

    setSpouse(spouse: Person) {
        // reverse mapping on both objects
        this.relations.spouse = spouse;
        spouse.relations.spouse = this;
    }

    addChildren(name: string, gender: string) {
        if(this.gender === GENDER.MALE) {
            throw new Error('CHILD_ADDITION_FAILED');
        }
        const child = PersonFactory.createPerson(name, gender);
        this.relations.children.push(child);
        return child;
    }
}

interface IPersonMap {
    [key: string]: Person
}

export class PersonFactory {
    static persons:IPersonMap =  {};

    static createPerson(name: string, gender: string) {
        let person = this.persons[name];
        if(!person) {
          throw new Error(`DUPLICATE_ENTRY`);
        }
        person = new Person(name, gender);
        this.persons[name] = person;
        return person;
    }

    static getPerson(name: string) {
        const person = this.persons[name];
        if(!person) {
            throw new Error(`PERSON_NOT_FOUND`);
        }
    }

}