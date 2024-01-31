export interface InitialResponse {
    data: InitialData
}

export interface InitialData {
    sessionToken: string,
    status: string,
    action: string,
    content: InitialContent,
}

export interface InitialContent {
    results: InitialResults,
    stats: any,
    sortingOptions: SortingOptions
}

// type is any due to the data structure
export interface InitialResults {
    itineraries: any,
    legs: any,
    segments: any,
    places: any,
    carriers: any,
    agents: any,
    alliances: any,
}

export type SortingOptions = {
    cheapest: [],
    best: [],
    fastets: [],
}

export interface ManagedData {
    results: InitialResults,
    sessionToken: string,
    status: string,
}

export interface FilteredData {
    itineraries: any[];
    legs: any[];
    carriers: Record<string, Carrier>;
    cities: any; // parameter is cityId
}

export interface Carrier {
    id: string;
    name: string;
    logo: string;
    imageUrl?: string;
}

export interface Cities {
    entityId: string;
    parentId: string;
    name: string;
    type: string;
    iata: string;
    coordinates: null
}

export interface FlightInfo {
    itinerary: string[];
    link: string;
    price: number | string;
    carriers: Carrier[][];
    depTime: (string | null)[];
    arrivalTime: (string | null)[];
    duration: (number | null)[];
    originPlaceName: (string | null)[],
    destinationPlaceName: (string | null)[],
}

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