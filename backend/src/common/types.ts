export type Location = {
    lat: number;
    lng: number;
}
  
export type Journey = {
    start_location: Location;
    end_location: Location;
}
  
export type Parcel = {
    location: Location;
    name: string;
}

export type DataObject = {
    geometry: {
      location: {
        lat: number;
        lng: number;
      }
    },
    name: string;
  }

export  type NearbySearchResponse = {
    html_attributions: string[];
    next_page_token: string;
    results: {
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
        viewport: {
          northeast: {
            lat: number;
            lng: number;
          };
          southwest: {
            lat: number;
            lng: number;
          };
        };
      };
      icon: string;
      id: string;
      name: string;
      opening_hours?: {
        open_now: boolean;
        periods: {
          close: {
            day: number;
            time: string;
          };
          open: {
            day: number;
            time: string;
          };
        }[];
        weekday_text: string[];
      };
      photos?: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
      }[];
      place_id: string;
      rating?: number;
      reference: string;
      scope: string;
      types: string[];
      vicinity: string;
    }[];
    status: 'OK' | 'UNKNOWN_ERROR' | 'ZERO_RESULTS';
  }
  
  
