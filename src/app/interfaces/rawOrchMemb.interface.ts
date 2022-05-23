import { IRawOrchestra } from "./rawOrchestra.interface";

export interface IRawOrchMemb {
    orchMembs: {
        membership: Array<IRawMemb>
        orchestra: Array<IRawOrchestra>
    }
}

interface IRawMemb {
    instrument: string;
    joined_at:string;
    player_id: number;
    orchestra_id: number;
}