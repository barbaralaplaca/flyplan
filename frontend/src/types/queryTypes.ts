export interface Query {
    query: DetailsQuery;
}

export interface DetailsQuery {
    market:       string;
    locale:       string;
    currency:     string;
    queryLegs:    QueryLeg[];
    cabinClass:   string;
    adults:       number;
}

export interface QueryLeg {
    originPlaceId:      PlaceID;
    destinationPlaceId: PlaceID;
    date:               DateClass;
}

export interface DateClass {
    year:  number;
    month: number;
    day:   number;
}

export interface PlaceID {
    iata: string;
}