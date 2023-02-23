import { ObjectId } from "bson";

export class IRangeDate{
  
    from: Date;
    to: Date;
  }
export class IHousing {
    userId: ObjectId;
    remark?: string;
    availability: IRangeDate;
    participant: number;
    price:number;
  }