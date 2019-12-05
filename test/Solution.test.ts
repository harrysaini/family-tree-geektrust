import Solution, { COMMAND } from '../src/Solution';
import { Family, GENDER } from '../src/Person';
import { setUpFamilyTree } from '../src/TreeSetup';
import { RELATIONS } from '../src/getRelatives';
import { expect } from 'chai';
import { getNames } from './testUtils';

describe('Solution.ts Tests', () => {
  let family: Family;

  before(() => {
    family = setUpFamilyTree();
  })

  describe('executeGetRelationCommand function tests', () => {

    const testCases = [
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Vasa', RELATIONS.PATERNAL_UNCLE],
        result: 'Vyas'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Chit', RELATIONS.SIBLINGS],
        result: ['Ish', 'Vich', 'Aras', 'Satya'].join(' ')
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Shan', RELATIONS.BROTHER_IN_LAW],
        result: 'NONE'
      }
    ];

    testCases.forEach((testCase, index) => {
      it(`gives correct result for args ${testCase.args} for case ${index}`, () => {
        const relatives = Solution.executeGetRelationCommand(testCase.args, family);
        expect(relatives).to.be.eql(testCase.result);
      });
    });


    const errorCases = [
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Chit', 'vhj'],
        message: 'UNSUPPORTED_RELATION'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Topa', RELATIONS.BROTHER_IN_LAW],
        message: 'PERSON_NOT_FOUND'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, '', RELATIONS.BROTHER_IN_LAW],
        message: 'GET_RELATIONSHIP_INVALID_ARGUMENTS'
      }
    ];

    errorCases.forEach((testCase) => {
      it(`throws error ${testCase.message} for args ${testCase.args}`, () => {
        let errorThrown: boolean = false;
        try {
          Solution.executeGetRelationCommand(testCase.args, family);
        } catch (e) {
          errorThrown = true;
          expect(e).to.be.an.instanceOf(Error);
          expect(e.message).to.be.equal(testCase.message);
        }
        expect(errorThrown).to.be.true;
      });
    });

  });

  describe('executeAddChildCommand function tests', () => {

    const testCases = [
      {
        args: [COMMAND.ADD_CHILD, 'Anga', 'Vama', GENDER.MALE],
        children: 6
      },
      {
        args: [COMMAND.ADD_CHILD, 'Chitra', 'Shyama', GENDER.MALE],
        children: 3
      }
    ];

    testCases.forEach((testCase, index) => {
      it(`gives adds child for args ${testCase.args} for case ${index}`, () => {
        const res = Solution.executeAddChildCommand(testCase.args, family);
        expect(res).to.be.equal('CHILD_ADDITION_SUCCEEDED');
        const mother = family.getPerson(testCase.args[1]);
        expect(mother.relations.children).not.undefined;
        expect(mother.relations.children && mother.relations.children.length).to.be.eql(testCase.children);
        expect(getNames(mother.relations.children)).to.contain(testCase.args[2]);
        const child = family.getPerson(testCase.args[2]);
        expect(child.relations.mother).to.be.eql(mother);
      });
    });

    const errorCases = [
      {
        args: [COMMAND.ADD_CHILD, 'Shan', 'vhj', GENDER.MALE],
        message: 'CHILD_ADDITION_FAILED'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Shands', 'vhj', GENDER.MALE],
        message: 'PERSON_NOT_FOUND'
      },
      {
        args: [COMMAND.ADD_CHILD, '', RELATIONS.BROTHER_IN_LAW],
        message: 'ADD_CHILD_INVALID_ARGUMENTS'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Anga', 'Satya', GENDER.MALE],
        message: 'DUPLICATE_ENTRY'
      },
    ]


    errorCases.forEach((testCase) => {
      it(`throws error ${testCase.message} for args ${testCase.args}`, () => {
        let errorThrown: boolean = false;
        try {
          Solution.executeAddChildCommand(testCase.args, family);
        } catch (e) {
          errorThrown = true;
          expect(e).to.be.an.instanceOf(Error);
          expect(e.message).to.be.equal(testCase.message);
        }
        expect(errorThrown).to.be.true;
      });
    });
  });

  describe(`executeCommand function test`, () => {
    const testCases = [
      {
        args: [COMMAND.ADD_CHILD, 'Anga', 'Ravana', GENDER.MALE],
        result: 'CHILD_ADDITION_SUCCEEDED'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Jaya', RELATIONS.SON],
        result: 'Yodhan'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Shan', 'vhj', GENDER.MALE],
        result: 'CHILD_ADDITION_FAILED'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Shands', 'vhj', GENDER.MALE],
        result: 'PERSON_NOT_FOUND'
      },
      {
        args: [COMMAND.ADD_CHILD, '', RELATIONS.BROTHER_IN_LAW],
        result: 'ADD_CHILD_INVALID_ARGUMENTS'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Anga', 'Satya', GENDER.MALE],
        result: 'DUPLICATE_ENTRY'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Chit', 'vhj'],
        result: 'UNSUPPORTED_RELATION'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Topa', RELATIONS.BROTHER_IN_LAW],
        result: 'PERSON_NOT_FOUND'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, '', RELATIONS.BROTHER_IN_LAW],
        result: 'GET_RELATIONSHIP_INVALID_ARGUMENTS'
      },
      {
        args: ['INVALID', '', RELATIONS.BROTHER_IN_LAW],
        result: 'INVALID_COMMAND'
      }
    ];

    testCases.forEach((testCase, index) => {
      it(`gives correct result for command ${testCase.args.join(' ')} for case ${index}`, () => {
        const result = Solution.executeCommand(testCase.args.join(' '), family);
        expect(result).to.be.eql(testCase.result);
      });
    })
  });

  describe(`solve function test`, () => {
    const commands = [
      {
        args: [COMMAND.ADD_CHILD, 'Anga', 'Ravana', GENDER.MALE],
        result: 'CHILD_ADDITION_SUCCEEDED'
      },
      {
        args: [COMMAND.GET_RELATIONSHIP, 'Jaya', RELATIONS.SON],
        result: 'Yodhan'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Shan', 'vhj', GENDER.MALE],
        result: 'CHILD_ADDITION_FAILED'
      },
      {
        args: [COMMAND.ADD_CHILD, 'Shands', 'vhj', GENDER.MALE],
        result: 'PERSON_NOT_FOUND'
      }
    ];

    const cmds: string[] = [];
    const results: string[] = [];

    commands.forEach((command) => {
      cmds.push(command.args.join(' '));
      results.push(command.result);
    });


    it(`gives correct result for commands`, () => {
      const result = Solution.solve(cmds);
      expect(result).to.be.eql(results);
    });

  });

});