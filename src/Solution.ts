import { setUpFamilyTree } from "./TreeSetup";
import { PersonFactory } from "./Person";
import { getRelatives } from "./getRelatives";
import { getNames } from "./utils";

enum COMMAND {
  ADD_CHILD = 'ADD_CHILD',
  GET_RELATIONSHIP = 'GET_RELATIONSHIP'
}

class Solution {

  static solve(commands: string[]) {
    setUpFamilyTree();
    const outputs = commands.map((command) => {
      return this.executeCommand(command);
    });
    return outputs;
  }

  static executeCommand(command: string): string{
    try {
      const args = command.split(' ');
      if(args[0] === COMMAND.ADD_CHILD) {
        return this.executeAddChildCommand(args);
      } else if (args[0] === COMMAND.GET_RELATIONSHIP) {
        return this.executeGetRelationCommand(args);
      } else {
        return 'INVALID_COMMAND';
      }
    } catch (e) {
      return e.message;
    }
  }

  static executeAddChildCommand(args: string[]) {
    const motherName = args[1];
    const childName = args[2];
    const gender = args[3];

    if(!motherName || !childName || !gender) {
      throw new Error('ADD_CHILD_INVALID_ARGUMENTS');
    }

    const mother = PersonFactory.getPerson(motherName);

    mother.addChildren(childName, gender);
    return 'CHILD_ADDITION_SUCCEEDED';
  }

  static executeGetRelationCommand(args: string[]) {
    const name = args[1];
    const relation = args[2];

    if(!name || !relation) {
      throw new Error('GET_RELATIONSHIP_INVALID_ARGUMENTS');
    }

    const person = PersonFactory.getPerson(name);

    const relatives = getRelatives(person, relation);

    if(relatives.length === 0) {
      return 'NONE';
    } else {
      return getNames(relatives).join(' ');
    }
  }
}

export default Solution;
