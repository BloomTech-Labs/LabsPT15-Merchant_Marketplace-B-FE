import { getUnixTime } from 'date-fns';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useProfile } from '../../../contexts/profile/ProfileProvider';
import { useFetch } from '../../../hooks/useFetch';
import { useOktaId } from '../../../hooks/useOktaId';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { StyledButton, StyledForm } from '../../../styles/styled-components';
import { ImageFormGallery } from '../../common/FormImageGallery';
import { Input } from '../../common/Input';
import { SearchPlaces } from '../../common/SearchPlaces';
import { Textarea } from '../../common/Textarea';

export function NewStoreForm() {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const { getLocalUrls, uploadImagesToS3 } = useUploadImage();
  const { dispatch, types } = useProfile();
  const { post, put, get } = useFetch();
  const { oktaId } = useOktaId();

  const location = useRef();

  function setLocation(place) {
    location.current = place;
  }

  async function onSubmit({
    name,
    opening_hours,
    closing_hours,
    description,
    phone_number,
  }) {
    const operating_hours = `${opening_hours} - ${closing_hours}`;
    const owner_id = oktaId;
    const stringLocation = JSON.stringify(location.current);
    const storeModel = {
      name,
      description,
      phone_number,
      operating_hours,
      owner_id,
      location: stringLocation,
      created_at: getUnixTime(Date.now()),
    };

    try {
      const storeRes = await post('store', storeModel);
      if (storeRes.request.status === 201) {
        const S3Urls = await uploadImagesToS3(imageFiles);
        await put(`store/${storeRes.data.id}`, {
          images: S3Urls,
        });
        const newStores = await get(`profile/${oktaId}/stores`);
        dispatch({ type: types.GET_STORES, payload: newStores.data });
        history.push(`/stores/${storeRes.data.id}/inventory`);
      }
    } catch (error) {
      console.error('Error creating new store: ', JSON.parse(error));
    }
  }

  function preventEnter(e) {
    let key = e.charCode || e.keyCode || 0;
    if (key === 13) {
      e.preventDefault();
    }
  }

  function onFileUpload(e) {
    const files = e.target.files;

    setImages(getLocalUrls(files));
    setImageFiles(files);
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
      <StyledInputGroup>
        <Input
          label="Name"
          placeholder="enter your store name..."
          ref={register({
            required: 'Name required',
          })}
          id="name"
          name="name"
          hasError={errors.name}
        />
        {errors.name ? (
          <StyledErrorMessage>{errors.name.message}</StyledErrorMessage>
        ) : null}
      </StyledInputGroup>
      <StyledInputGroup>
        <Textarea
          label="Description"
          placeholder="enter your store description..."
          ref={register({
            required: 'Description required',
          })}
          id="description"
          name="description"
          hasError={errors.description}
        />
        {errors.description ? (
          <StyledErrorMessage>{errors.description.message}</StyledErrorMessage>
        ) : null}
      </StyledInputGroup>
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
      <StyledInputGroup>
        <SearchPlaces
          label="Location"
          ref={register({
            required: 'Location required',
          })}
          setLocation={setLocation}
          hasError={errors.location}
        />
        {errors.location ? (
          <StyledErrorMessage>{errors.location.message}</StyledErrorMessage>
        ) : null}
      </StyledInputGroup>
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

const StyledInputGroup = styled.div`
  position: relative;
`;
const StyledErrorMessage = styled.p`
  position: absolute;
  color: red;
  margin-bottom: 0;
  right: 0;
  bottom: -24px;
`;
