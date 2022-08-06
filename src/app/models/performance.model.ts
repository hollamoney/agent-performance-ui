export class Performance {
    id: number |undefined;
    userId: string = "";
    beginTime: string = "";
    endTime: string = "";
    dateInfo: Date = new Date();
    excuseHours: number |undefined;
    excuseInfo: string = "";

    constructor(id?: number) {
        this.id = id;
      }    
}