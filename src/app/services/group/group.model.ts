import { User } from "../user/user.model";

export class GroupMembership {
    group: Group;
    member: User;
    role: string;

    constructor(group: Group, member: User, role: string) {
        this.group = group;
        this.member = member;
        this.role = role;
    }
}

export class Group {
    id: number;
    admin?: User;
    title: string;
    type: string;
    createdAt: string;
    info: string
    
    constructor(id: number, admin: User | undefined, title: string, type: string, createdAt: string, info: string) {
        this.id = id;
        this.admin = admin;
        this.title = title;
        this.type = type;
        this.createdAt = createdAt;
        this.info = info;
    }
}