import { } from 'mocha';
import { expect } from 'chai';

import { GetRelatives, RELATIONS, getRelatives } from '../src/getRelatives';
import { Person, Family, GENDER } from '../src/Person';
import { setUpFamilyTree } from '../src/TreeSetup';
import { getPersonBulk, getNames } from './testUtils';




describe('getRelatives.ts Tests', () => {
  let family: Family;

  before(() => {
    family = setUpFamilyTree();
  });

  describe('GetRelatives class tests', () => {

    describe(`filterByGender function Tests`, () => {

      let persons: Person[];

      before(() => {
        persons = getPersonBulk(family, ['Anga', 'Lika', 'Vich']);
      });


      it(`successfully filter for gender ${GENDER.MALE}`, () => {
        const males = GetRelatives.filterByGender(persons, GENDER.MALE);
        expect(males.length).to.be.equal(1);
        expect(getNames(males)).to.be.eql(['Vich']);
      });

      it(`successfully filter for gender ${GENDER.FEMALE}`, () => {
        const females = GetRelatives.filterByGender(persons, GENDER.FEMALE);
        expect(females.length).to.be.equal(2);
        expect(getNames(females)).to.be.eql(['Anga', 'Lika']);
      });

    });

    describe(`getSiblings function tests`, () => {
      const postiveCases = [
        {
          name: 'Vich',
          siblings: ['Chit', 'Ish', 'Aras', 'Satya']
        },
        {
          name: 'Dritha',
          siblings: ['Tritha', 'Vritha']
        },
        {
          name: 'Vich',
          siblings: ['Chit', 'Ish', 'Aras'],
          gender: GENDER.MALE
        },
        {
          name: 'Vich',
          siblings: ['Satya'],
          gender: GENDER.FEMALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const siblings = GetRelatives.getSiblings(person, testCase.gender);
          expect(getNames(siblings)).to.be.eql(testCase.siblings);
        });
      });

      ['Shan', 'Lika', 'Vyan'].forEach((name) => {
        it(`return empty array for case no siblings or outer family - ${name}`, () => {
          const person = family.getPerson(name);
          const siblings = GetRelatives.getSiblings(person);
          expect(siblings).to.be.eql([]);
        });
      })

    });

    describe(`getFatherSiblings function tests`, () => {
      const postiveCases = [
        {
          name: 'Vila',
          fatherSiblings: ['Chit', 'Ish', 'Aras'],
          gender: GENDER.MALE
        },
        {
          name: 'Vasa',
          fatherSiblings: ['Atya'],
          gender: GENDER.FEMALE
        },
        {
          name: 'Vila',
          fatherSiblings: ['Satya'],
          gender: GENDER.FEMALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const siblings = GetRelatives.getFatherSiblings(person, testCase.gender);
          expect(getNames(siblings)).to.be.eql(testCase.fatherSiblings);
        });
      });


      ['Jaya', 'Yodhan', 'Laki'].forEach((name) => {
        it(`return empty array for outside father or no mother  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const siblings = GetRelatives.getFatherSiblings(person, GENDER.MALE);
          expect(siblings).to.be.eql([]);
        });
      })
    });

    describe(`getMotherSiblings function tests`, () => {
      const postiveCases = [
        {
          name: 'Asva',
          motherSiblings: ['Chit', 'Ish', 'Vich', 'Aras'],
          gender: GENDER.MALE
        },
        {
          name: 'Laki',
          motherSiblings: ['Ahit'],
          gender: GENDER.MALE
        },
        {
          name: 'Yodhan',
          motherSiblings: ['Tritha'],
          gender: GENDER.FEMALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const siblings = GetRelatives.getMotherSiblings(person, testCase.gender);
          expect(getNames(siblings)).to.be.eql(testCase.motherSiblings);
        });
      });


      ['Jaya', 'Vila', 'Jinki', 'Shan'].forEach((name) => {
        it(`return empty array for outside mother or no mother  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const siblings = GetRelatives.getMotherSiblings(person, GENDER.MALE);
          expect(siblings).to.be.eql([]);
        });
      })
    });

    describe(`inLawsSpouseSide function tests`, () => {
      const postiveCases = [
        {
          name: 'Vyan',
          inLaws: ['Chit', 'Ish', 'Vich', 'Aras'],
          gender: GENDER.MALE
        },
        {
          name: 'Arit',
          inLaws: ['Ahit'],
          gender: GENDER.MALE
        },
        {
          name: 'Jaya',
          inLaws: ['Tritha'],
          gender: GENDER.FEMALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const inLaws = GetRelatives.inLawsSpouseSide(person, testCase.gender);
          expect(getNames(inLaws)).to.be.eql(testCase.inLaws);
        });
      });


      ['Ish', 'Aras', 'Laki', 'Shan'].forEach((name) => {
        it(`return empty array for no spouse or outside spouse  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const inLaws = GetRelatives.inLawsSpouseSide(person, GENDER.MALE);
          expect(inLaws).to.be.eql([]);
        });
      })
    });

    describe(`inLawsOwnSide function tests`, () => {
      const postiveCases = [
        {
          name: 'Satya',
          inLaws: ['Amba', 'Lika', 'Chitra'],
          gender: GENDER.MALE
        },
        {
          name: 'Aras',
          inLaws: ['Vyan'],
          gender: GENDER.FEMALE
        },
        {
          name: 'Ahit',
          inLaws: ['Arit'],
          gender: GENDER.FEMALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const inLaws = GetRelatives.inLawsOwnSide(person, testCase.gender);
          expect(getNames(inLaws)).to.be.eql(testCase.inLaws);
        });
      });


      ['Yodhan', 'Lika', 'Laki', 'Shan'].forEach((name) => {
        it(`return empty array for no siblings or outside person  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const inLaws = GetRelatives.inLawsOwnSide(person, GENDER.MALE);
          expect(inLaws).to.be.eql([]);
        });
      })
    });

    describe(`getInLaws function tests`, () => {
      const postiveCases = [
        {
          name: 'Ish',
          inLaws: ['Amba', 'Lika', 'Chitra'],
          spouseSiblingsGender: GENDER.FEMALE,
          ownSiblingsGender: GENDER.MALE
        },
        {
          name: 'Ish',
          inLaws: ['Vyan'],
          spouseSiblingsGender: GENDER.MALE,
          ownSiblingsGender: GENDER.FEMALE
        },
        {
          name: 'Jaya',
          inLaws: ['Tritha'],
          spouseSiblingsGender: GENDER.FEMALE,
          ownSiblingsGender: GENDER.MALE
        },
        {
          name: 'Amba',
          inLaws: ['Ish', 'Vich', 'Aras'],
          spouseSiblingsGender: GENDER.MALE,
          ownSiblingsGender: GENDER.MALE
        },
        {
          name: 'Vyan',
          inLaws: ['Chit', 'Ish', 'Vich', 'Aras'],
          spouseSiblingsGender: GENDER.MALE,
          ownSiblingsGender: GENDER.MALE
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const inLaws = GetRelatives.getInLaws(person, testCase.spouseSiblingsGender, testCase.ownSiblingsGender);
          expect(getNames(inLaws)).to.be.eql(testCase.inLaws);
        });
      });


      ['Yodhan', 'Laki', 'Shan'].forEach((name) => {
        it(`return empty array for no siblings or no spouse siblings outside person  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const inLaws = GetRelatives.getInLaws(person, GENDER.MALE, GENDER.FEMALE);
          expect(inLaws).to.be.eql([]);
        });
      })
    });

    describe(`getChildren function tests`, () => {
      const postiveCases = [
        {
          name: 'Anga',
          children: ['Satya'],
          gender: GENDER.FEMALE,
        },
        {
          name: 'Anga',
          children: ['Chit', 'Ish', 'Vich', 'Aras'],
          gender: GENDER.MALE,
        },
        {
          name: 'Jaya',
          children: ['Yodhan'],
          gender: GENDER.MALE,
        },
        {
          name: 'Jaya',
          children: [],
          gender: GENDER.FEMALE,
        },
        {
          name: 'Jinki',
          children: ['Laki'],
          gender: GENDER.MALE,
        }
      ];

      postiveCases.forEach((testCase, index) => {
        it(`gives correct result for case ${index}`, () => {
          const person = family.getPerson(testCase.name);
          const children = GetRelatives.getChildren(person, testCase.gender);
          expect(getNames(children)).to.be.eql(testCase.children);
        });
      });


      ['Yodhan', 'Laki', 'Ahit'].forEach((name) => {
        it(`return empty array for no childrem  - ${name}`, () => {
          debugger;
          const person = family.getPerson(name);
          const childrem = GetRelatives.getChildren(person, GENDER.MALE);
          expect(childrem).to.be.eql([]);
        });
      })
    });
  });

  describe(`getRelatives function tests`, () => {
    const testCases = [
      {
        name: 'Vyan',
        relation: RELATIONS.BROTHER_IN_LAW,
        result: ['Chit', 'Ish', 'Vich', 'Aras']
      },
      {
        name: 'Anga',
        relation: RELATIONS.DAUGHTER,
        result: ['Satya']
      },
      {
        name: 'Yodhan',
        relation: RELATIONS.MATERNAL_AUNT,
        result: ['Tritha']
      },
      {
        name: 'Asva',
        relation: RELATIONS.MATERNAL_UNCLE,
        result: ['Chit', 'Ish', 'Vich', 'Aras']
      },
      {
        name: 'Vasa',
        relation: RELATIONS.PATERNAL_AUNT,
        result: ['Atya']
      },
      {
        name: 'Vasa',
        relation: RELATIONS.PATERNAL_UNCLE,
        result: ['Vyas']
      },
      {
        name: 'Chit',
        relation: RELATIONS.SIBLINGS,
        result: ['Ish', 'Vich', 'Aras', 'Satya']
      },
      {
        name: 'Ish',
        relation: RELATIONS.SISTER_IN_LAW,
        result: ['Amba', 'Lika', 'Chitra']
      },
      {
        name: 'Jaya',
        relation: RELATIONS.SON,
        result: ['Yodhan']
      }
    ];

    testCases.forEach((testCase, index) => {
      it(`gives correct result ${testCase.relation} of ${testCase.name} for case ${index}`, () => {
        const person = family.getPerson(testCase.name);
        const relatives = getRelatives(person, testCase.relation);
        expect(getNames(relatives)).to.be.eql(testCase.result);
      });
    });

    it(`throws error for unsupported relations`, () => {
      let errorThrown: boolean = false;
      try {
        const person = family.getPerson('Shan');
        getRelatives(person, 'bhatija');
      } catch (e) {
        errorThrown = true;
        expect(e).to.be.an.instanceOf(Error);
        expect(e.message).to.be.equal('UNSUPPORTED_RELATION');
      }
      expect(errorThrown).to.be.true;
    });

  })

});
