import { IRawCountry, IRawLocation } from "./rawLocation.interface"

export interface ILocationResponse {
    locations: Array<IRawLocation>
}

export interface ICountryResponse {
    countries: Array<IRawCountry>
}
