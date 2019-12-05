import { setUpFamilyTree } from "./TreeSetup";
import { Family } from "./Person";
import { getRelatives } from "./getRelatives";
import { getNames } from "./utils";

export enum COMMAND {
  ADD_CHILD = 'ADD_CHILD',
  GET_RELATIONSHIP = 'GET_RELATIONSHIP'
}

class Solution {

  /**
   * Execute array of commands
   * @param commands
   */
  static solve(commands: string[]) {
    const family: Family = setUpFamilyTree();
    const outputs = commands.map((command) => {
      return this.executeCommand(command, family);
    });
    return outputs;
  }

  /**
   * Execute single command
   * @param command
   * @param family
   */
  static executeCommand(command: string, family: Family): string{
    try {
      const args = command.split(' ');
      if(args[0] === COMMAND.ADD_CHILD) {
        return this.executeAddChildCommand(args, family);
      } else if (args[0] === COMMAND.GET_RELATIONSHIP) {
        return this.executeGetRelationCommand(args, family);
      } else {
        return 'INVALID_COMMAND';
      }
    } catch (e) {
      return e.message;
    }
  }

  /**
   * Execute add child command
   * @param args
   * @param family
   */
  static executeAddChildCommand(args: string[], family: Family) {
    const motherName = args[1];
    const childName = args[2];
    const gender = args[3];

    if(!motherName || !childName || !gender) {
      throw new Error('ADD_CHILD_INVALID_ARGUMENTS');
    }

    const mother = family.getPerson(motherName);

    mother.addChildren(childName, gender, family);
    return 'CHILD_ADDITION_SUCCEEDED';
  }

  /**
   * Execute get relation command
   * @param args
   * @param family
   */
  static executeGetRelationCommand(args: string[], family: Family) {
    const name = args[1];
    const relation = args[2];

    if(!name || !relation) {
      throw new Error('GET_RELATIONSHIP_INVALID_ARGUMENTS');
    }

    const person = family.getPerson(name);

    const relatives = getRelatives(person, relation);

    if(relatives.length === 0) {
      return 'NONE';
    } else {
      return getNames(relatives).join(' ');
    }
  }
}

export default Solution;
