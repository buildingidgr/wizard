export interface AddressComponents {
  street_number?: string;
  route?: string;
  locality?: string;
  administrative_area_level_1?: string;
  country?: string;
  postal_code?: string;
}

export interface ExtendedPlaceResult extends google.maps.places.PlaceResult {
  parsedAddress?: AddressComponents;
} 