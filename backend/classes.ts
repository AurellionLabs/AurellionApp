
export class EventObject {
  id: string;
  value: any;
  type: string;
  age: string;
  killEvent(): void {  this.id = "", this.value = null, this.type = "" };
  catEvent(): void { console.log(this) };

  constructor(id: string, value: any, type: string, age: string) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.age = age;
  }
}
