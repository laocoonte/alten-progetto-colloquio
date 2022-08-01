import { Pipe, PipeTransform } from "@angular/core";

const labels = {
  id: 'id',
  name:'nome',
  address: 'indirizzo',
  street: 'via',
  suite: 'interno',
  city: 'città',
  zipcode: 'codice postale',
  phone: 'telefono',
  website: 'sito web',
  company: 'azienda',
  catchPhrase: 'slogan',
}


@Pipe({ name: 'translateuserprop'})
export class TranslateUserProp implements PipeTransform {
    transform(value: string): any {
      return labels[value] || value;
    }
}