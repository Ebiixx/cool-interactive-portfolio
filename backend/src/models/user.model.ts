import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = model('User', userSchema);

export default User;

export interface UserDTO {
    id?: number;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    lastLogin?: Date;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: UserResponse;
    token: string;
}