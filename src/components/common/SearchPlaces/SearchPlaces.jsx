import React, { forwardRef, useCallback, useState } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import { Input } from '../Input';

const GOOGLE_API = process.env.REACT_APP_GOOGLE_API_KEY;
const libraries = ['places'];

export const SearchPlaces = forwardRef(({ label, setLocation }, ref) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [query, setQuery] = useState('');

  const onPlacesLoad = useCallback(autocomplete => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    setLocation(place);
    // const lat = place.geometry.location.lat()
    // const lng = place.geometry.location.lng()
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API} libraries={libraries}>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onPlacesLoad}>
        <Input
          type="text"
          placeholder="Search for an address"
          value={query}
          onChange={e => setQuery(e.target.value)}
          label={label}
          name="location"
          ref={ref}
        />
      </Autocomplete>
    </LoadScript>
  );
});
