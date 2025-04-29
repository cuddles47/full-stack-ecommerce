import { Model } from "mongoose";

export interface ISequence {
    seqId?: string;
    sequences?: any;
}

export interface ISequenceDoc extends ISequence {}

export interface ISequenceModel extends Model<ISequenceDoc> {
    getNextAlphaNumSeq(seqId: number, data: any): any;
}
