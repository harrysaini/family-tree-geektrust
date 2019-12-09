import { GENDER } from './Person';
import { Family } from './Family';

export const setUpFamilyTree = () => {
  const family = new Family();
  const shan = family.createPerson('Shan', GENDER.MALE);
  const anga = family.createPerson('Anga', GENDER.FEMALE);

  anga.setSpouse(shan);

  const chit = anga.addChildren('Chit', GENDER.MALE, family);
  const ish = anga.addChildren('Ish', GENDER.MALE, family);
  const vich = anga.addChildren('Vich', GENDER.MALE, family);
  const aras = anga.addChildren('Aras', GENDER.MALE, family);
  const satya = anga.addChildren('Satya', GENDER.FEMALE, family);

  const amba = family.createPerson('Amba', GENDER.FEMALE);
  amba.setSpouse(chit);

  const dritha = amba.addChildren('Dritha', GENDER.FEMALE, family);
  const tritha = amba.addChildren('Tritha', GENDER.FEMALE, family);
  const vritha = amba.addChildren("Vritha", GENDER.MALE, family);

  const jaya = family.createPerson('Jaya', GENDER.MALE);
  dritha.setSpouse(jaya);
  dritha.addChildren('Yodhan', GENDER.MALE, family);

  const lika = family.createPerson('Lika', GENDER.FEMALE);
  vich.setSpouse(lika);

  const vila = lika.addChildren('Vila', GENDER.FEMALE, family);
  const chika = lika.addChildren('Chika', GENDER.FEMALE, family);

  const chitra = family.createPerson('Chitra', GENDER.FEMALE);
  chitra.setSpouse(aras);

  const jinki = chitra.addChildren('Jinki', GENDER.FEMALE, family);
  const ahit = chitra.addChildren('Ahit', GENDER.MALE, family);
  const arit = family.createPerson('Arit', GENDER.MALE);
  jinki.setSpouse(arit);

  jinki.addChildren('Laki', GENDER.MALE, family);
  jinki.addChildren('Lavnya', GENDER.FEMALE, family);

  const vyan = family.createPerson('Vyan', GENDER.MALE);
  satya.setSpouse(vyan);

  const vyas = satya.addChildren('Vyas', GENDER.MALE, family);
  const asva = satya.addChildren('Asva', GENDER.MALE, family);
  const atya = satya.addChildren('Atya', GENDER.FEMALE, family);

  const satvy = family.createPerson('Satvy', GENDER.FEMALE);
  satvy.setSpouse(asva);
  satvy.addChildren('Vasa', GENDER.MALE, family);

  const krpi = family.createPerson('Krpi', GENDER.FEMALE);
  krpi.setSpouse(vyas);
  krpi.addChildren('Kriya', GENDER.MALE, family);
  krpi.addChildren('Krithi', GENDER.FEMALE, family);

  return family;
}
