import { setUpFamilyTree } from "../src/TreeSetup";
import { Family } from "../src/Family";
import { expect } from "chai";
import { getNames } from "./testUtils";
import { RELATIONS } from "../src/Person";

describe(`Person getRelatives function tests`, () => {

  let family: Family;

  before(() => {
    family = setUpFamilyTree();
  });

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
      const relatives = person.getRelatives(testCase.relation);
      expect(getNames(relatives)).to.be.eql(testCase.result);
    });
  });

  it(`throws error for unsupported relations`, () => {
    let errorThrown: boolean = false;
    try {
      const person = family.getPerson('Shan');
      person.getRelatives('bhatija' as any);
    } catch (e) {
      errorThrown = true;
      expect(e).to.be.an.instanceOf(Error);
      expect(e.message).to.be.equal('UNSUPPORTED_RELATION');
    }
    expect(errorThrown).to.be.true;
  });

})