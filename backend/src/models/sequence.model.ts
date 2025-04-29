import { Schema, model } from "mongoose";
import { ISequenceDoc, ISequenceModel } from "../interfaces/sequence.interface";
import forOwn from "lodash/forOwn";
import { CallbackWithoutResultAndOptionalError } from "mongoose";

// schema to store “auto incremental” fields
export const SequenceSchema = new Schema(
    {
        seqId: { type: String, required: true },
    },
    { collection: "Sequence" }
);

SequenceSchema.statics.getNextAlphaNumSeq = async function (seqId, data) {
    return this.findOneAndUpdate(
        { seqId },
        { $set: { ...data } },
        { upsert: true, new: true }
    ).exec();
};

export const SequenceModel = model<ISequenceDoc, ISequenceModel>(
    "Sequence",
    SequenceSchema
);
