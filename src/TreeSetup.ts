import { PersonFactory, GENDER } from './Person';

const setUpFamilyTree = () => {
  const shan = PersonFactory.createPerson('Shan', GENDER.MALE);
  const anga = PersonFactory.createPerson('Anga', GENDER.FEMALE);

  anga.setSpouse(shan);

  const chit = anga.addChildren('Chit', GENDER.MALE);
  const ish = anga.addChildren('Ish', GENDER.MALE);
  const vich = anga.addChildren('Vich', GENDER.MALE);
  const aras = anga.addChildren('Aras', GENDER.MALE);
  const satya = anga.addChildren('Satya', GENDER.FEMALE);

  const amba = PersonFactory.createPerson('Amba', GENDER.FEMALE);
  amba.setSpouse(chit);

  const dritha = amba.addChildren('Dritha', GENDER.FEMALE);
  const tritha = amba.addChildren('Tritha', GENDER.FEMALE);
  const vritha = amba.addChildren("vritha", GENDER.MALE);

  const jaya = PersonFactory.createPerson('Jaya', GENDER.MALE);
  dritha.setSpouse(jaya);
  dritha.addChildren('Yodhan', GENDER.MALE);

  const lika = PersonFactory.createPerson('Lika', GENDER.FEMALE);
  vich.setSpouse(lika);

  const vila = lika.addChildren('Vila', GENDER.FEMALE);
  const chika = lika.addChildren('Chika', GENDER.FEMALE);

  const chitra = PersonFactory.createPerson('Chitra', GENDER.FEMALE);
  chitra.setSpouse(aras);

  const ahit = chitra.addChildren('Ahit', GENDER.MALE);
  const jinki = chitra.addChildren('Jinki', GENDER.FEMALE);
  const arit = PersonFactory.createPerson('Arit', GENDER.MALE);
  jinki.setSpouse(arit);

  jinki.addChildren('Lkai', GENDER.MALE);
  jinki.addChildren('Lavnya', GENDER.FEMALE);

  const vyan = PersonFactory.createPerson('Vyan', GENDER.MALE);
  satya.setSpouse(vyan);

  const asva = satya.addChildren('Asva', GENDER.MALE);
  const vyas = satya.addChildren('Vyas', GENDER.MALE);
  const atya = satya.addChildren('Atya', GENDER.FEMALE);

  const satvy = PersonFactory.createPerson('Satvy', GENDER.FEMALE);
  satvy.setSpouse(asva);
  satvy.addChildren('Vasa', GENDER.MALE);

  const krpi = PersonFactory.createPerson('Krpi', GENDER.FEMALE);
  krpi.setSpouse(atya);
  krpi.addChildren('Kriya', GENDER.MALE);
  krpi.addChildren('Krithi', GENDER.FEMALE);
}
