import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { StyledButton, StyledForm } from '../../../styles/styled-components';
import { ImageFormGallery } from '../../common/FormImageGallery';
import { Input } from '../../common/Input';
import { SearchPlaces } from '../../common/SearchPlaces';
import { Textarea } from '../../common/Textarea';

export function NewStoreForm() {
  const [images, setImages] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const location = useRef();

  function setLocation(place) {
    location.current = place;
  }

  function onSubmit(data) {
    console.log({ data });
    const stringifyLocation = JSON.stringify(location.current);
    console.log(stringifyLocation);
    console.log(JSON.parse(stringifyLocation));
  }

  function preventEnter(e) {
    let key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
    }
  }

  function onFileUpload(e) {
    setImages(
      Array.from(e.target.files)
        .map(file => URL.createObjectURL(file))
        .slice(0, 5)
    );

    Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} onKeyPress={preventEnter}>
      <ImageFormGallery images={images} />
      <StyledFlexContainer>
        <StyledUploadButton htmlFor="file">
          <input
            type="file"
            multiple
            onChange={onFileUpload}
            ref={register}
            id="file"
            name="file"
          />
          Upload Images
        </StyledUploadButton>
        <span>5 images maximum</span>
      </StyledFlexContainer>
      <Input
        label="Name"
        placeholder="enter your store name..."
        ref={register}
        id="name"
        name="name"
      />
      <Textarea
        label="Description"
        placeholder="enter your store description..."
        ref={register}
        id="description"
        name="description"
      />
      <Input
        label="Phone number"
        placeholder="enter your store phone number..."
        ref={register}
        id="phone_number"
        name="phone_number"
      />
      <StyledGridContainer>
        <Input
          label="Opening hours"
          type="time"
          ref={register}
          id="opening_hours"
          name="opening_hours"
        />
        <Input
          label="Closing hours"
          type="time"
          ref={register}
          id="closing_hours"
          name="closing_hours"
        />
      </StyledGridContainer>
      <SearchPlaces label="Location" ref={register} setLocation={setLocation} />
      <StyledButton type="submit">Create Store</StyledButton>
    </StyledForm>
  );
}

const StyledUploadButton = styled.label`
  input[type='file'] {
    display: none;
  }

  padding: 12px 24px;

  background: #c8c9ce;
  color: black;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 400;
  width: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 200ms ease-in-out;

  &:hover {
    background: #adaeb3;
  }
`;

const StyledFlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;

  span {
    margin-left: 8px;
    color: gray;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
