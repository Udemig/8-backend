import { Schema } from "mongoose";
export declare const Gig: import("mongoose").Model<{
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    versionKey: false;
    timestamps: true;
    toJSON: {
        transform: (doc: any, ret: any) => any;
    };
}> & Omit<{
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
    timestamps: true;
    toJSON: {
        transform: (doc: any, ret: any) => any;
    };
}, {
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
} & import("mongoose").DefaultTimestampProps, any, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, any> | undefined;
}, {
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    description: string;
    user: import("mongoose").Types.ObjectId;
    title: string;
    reviewCount: number;
    starCount: number;
    category: string;
    coverImage: string;
    images: string[];
    packageTitle: string;
    packageDescription: string;
    packagePrice: number;
    packageFeatures: string[];
    packageDuration: number;
    packageRevision: number;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=gig.model.d.ts.map