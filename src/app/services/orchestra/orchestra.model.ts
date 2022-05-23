import { User } from "../user/user.model";

export class OrchestraMembership {
    orchestra: Orchestra;
    joinedAt: string;
    instrument: string;

    constructor(orchestra: Orchestra, joinedAt: string, instrument: string) {
        this.orchestra = orchestra;
        this.joinedAt = joinedAt;
        this.instrument = instrument;
    }
}

export class Orchestra {
    id: number;
    conductor: User;
    name: string;
    info: string;
    playersNo: number;
    foundedAt: string;
    countryIsoCode: string;

    constructor(id: number, conductor: User, name: string, info: string, playersNo: number, foundedAt: string, countryIsoCode: string) {
        this.id = id;
        this.conductor = conductor;
        this.name = name;
        this.info = info;
        this.playersNo = playersNo;
        this.foundedAt = foundedAt;
        this.countryIsoCode = countryIsoCode;
    }        
}