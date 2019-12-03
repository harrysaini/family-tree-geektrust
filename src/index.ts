import Solution from "./Solution"
import fs from 'fs';

class FamilyTree {
  // static runCommands() {
  //   Solution.solve([
  //     'ADD_CHILD Chitra Aria Female',
  //     'GET_RELATIONSHIP Lavnya Maternal-Aunt',
  //     'GET_RELATIONSHIP Aria Siblings',
  //     'ADD_CHILD Pjali Srutak Male',
  //     'GET_RELATIONSHIP Pjali Son',
  //     'ADD_CHILD Asva Vani Female',
  //     'GET_RELATIONSHIP Vasa Siblings',
  //     'GET_RELATIONSHIP Atya Sister-In-Law',
  //     'ADD_CHILD Satya Ketu Male',
  //     'GET_RELATIONSHIP Kriya Paternal-Uncle',
  //     'GET_RELATIONSHIP Satvy Brother-In-Law',
  //     'GET_RELATIONSHIP Satvy Sister-In-Law',
  //     'GET_RELATIONSHIP Ish Son',
  //     'GET_RELATIONSHIP Misha Daughter'
  //   ]);
  // }

  static getFilePath(args: string[]) {
    return args[2];
  }

  static async start() {
    const path = this.getFilePath(process.argv);
    if(!path) {
      console.log('PATH_NOT_SPECIFIED');
      return;
    }
    const file = fs.readFileSync(path, 'utf-8');
    const commands = file.split('\n');
    const outputs = Solution.solve(commands);
    outputs.forEach((output: string) => {
      console.log(output);
    });
  }

}



FamilyTree.start();
