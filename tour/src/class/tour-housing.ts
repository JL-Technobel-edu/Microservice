import { ObjectId } from "bson";

import * as moment from "moment";
import * as _ from "lodash";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus } from "@nestjs/common";
export class TourHousing  {
    private _userId: ObjectId;
    private _housingId: ObjectId;
    private _ownerId: ObjectId;
    private _remark?: string;
    private _phonenumber?: string;
    private _from: Date;
    private _to: Date;
    private _participant: number;
    private _price:number;
    private _total:number;
    private _duration:number;
    private _housing:any;
    constructor(source:any){

        this.userId = new ObjectId(source.prop.userId);
        this.housingId = new ObjectId(source.housing.id);
        this.remark = source.prop.remark;
        this.phonenumber = source.prop.phonenumber;
        this.from = new Date(source.prop.from);
        this.to = new Date(source.prop.to);
        this.participant = source.prop.participant;        
        this.housing = source.housing;
        this.build()
   
    }
    build(){        
        const h = this.getRealAvailability();
        this.price = _.meanBy(h, function(o:any) { return o.price; });
        this.total = (this.participant * this.price ) * this.getDurationDiff(this.from,this.to,"asDays");

    }
    get housing(){
        return this._housing;
    }
    set housing(h){
        this._housing=h;
    }
    get userId(){
        return this._userId;
    }
    set userId(id){
        this._userId=id;
    }
    get housingId(){
        return this._housingId;
    }
    set housingId(id){
        this._housingId=id;
    }
    get ownerId(){
        return this._ownerId;
    }
    set ownerId(id){
        this._ownerId=id;
    }

    get remark(){
        return this._remark;
    }
    set remark(txt){
        this._remark=txt;
    }

    get phonenumber(){
        return this._phonenumber;
    }
    set phonenumber(txt){
        this._phonenumber=txt;
    }
    get from(){
        return this._from;
    }
    set from(dt){
        this._from=dt;
    }
    get to(){
        return this._to;
    }
    set to(dt){
        this._to=dt;
    }
    get participant(){
        return this._participant;
    }
    set participant(num){
        this._participant=num;
    }
    get price(){
        return this._price;
    }
    set price(num){
        this._price=num;
    }
    get total(){
        return this._total;
    }
    set total(num){
        this._total=num;
    }
    get duration(){
        return this._duration;
    }
    set duration(num){
        this._duration=num;
    }
    get tour(){
        return {
            userId:this.userId ,
            housingId:this.housingId ,
            remark:this.remark ,
            phonenumber:this.phonenumber,
            from:this.from ,
            to:this.to ,
            participant:this.participant ,     
            price:this.price ,
            total:this.total
        } 
    }
    getDurationDiff(from:Date,to:Date,prop:string){

        return Math.round(moment.duration(moment(to).diff(moment(from)))[prop]());
    }
    getDt(dt:any){
        return {from : new Date(dt.from), to : new Date(dt.to)};
    }

    getRealAvailability(){
        return this.housing.availability.filter(e=>
           
           moment(e.period).isSameOrAfter(this.from) && moment(e.period).isSameOrBefore(this.to) && e.capacity>=this.participant

        );


    }
}
