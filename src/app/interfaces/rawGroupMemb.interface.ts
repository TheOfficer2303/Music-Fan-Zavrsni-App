import { IRawGroup } from "./rawGroup.interface"

export interface IRawGroupMemb {
    groupMembs: Array<IRawMemb>
}

interface IRawMemb {
    admin_id: number;
    group_id: number;
    title: string;
    type: string;
    created_at: string;
    info: string;
    role: string;
}