import { Schema } from "mongoose";
declare const User: import("mongoose").Model<{
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
    versionKey: false;
    toJSON: {
        transform: (doc: import("mongoose").Document<unknown, {}, {
            username: string;
            email: string;
            password: string;
            country: string;
            profilePicture: string;
            isSeller: boolean;
            phone?: string | null;
            description?: string | null;
        }, {
            id: string;
        }, import("mongoose").DefaultSchemaOptions> & Omit<{
            username: string;
            email: string;
            password: string;
            country: string;
            profilePicture: string;
            isSeller: boolean;
            phone?: string | null;
            description?: string | null;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "id"> & {
            id: string;
        }, ret: any) => any;
    };
}> & Omit<{
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
    toJSON: {
        transform: (doc: import("mongoose").Document<unknown, {}, {
            username: string;
            email: string;
            password: string;
            country: string;
            profilePicture: string;
            isSeller: boolean;
            phone?: string | null;
            description?: string | null;
        }, {
            id: string;
        }, import("mongoose").DefaultSchemaOptions> & Omit<{
            username: string;
            email: string;
            password: string;
            country: string;
            profilePicture: string;
            isSeller: boolean;
            phone?: string | null;
            description?: string | null;
        } & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "id"> & {
            id: string;
        }, ret: any) => any;
    };
}, {
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
        username: string;
        email: string;
        password: string;
        country: string;
        profilePicture: string;
        isSeller: boolean;
        phone?: string | null;
        description?: string | null;
    }, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
        username: string;
        email: string;
        password: string;
        country: string;
        profilePicture: string;
        isSeller: boolean;
        phone?: string | null;
        description?: string | null;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    username: string;
    email: string;
    password: string;
    country: string;
    profilePicture: string;
    isSeller: boolean;
    phone?: string | null;
    description?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=user.model.d.ts.map