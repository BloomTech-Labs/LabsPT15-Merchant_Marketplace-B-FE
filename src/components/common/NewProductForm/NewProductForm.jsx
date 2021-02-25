import { InputNumber } from 'antd';
import { getUnixTime } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useFetch } from '../../../hooks/useFetch';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { StyledButton, StyledForm } from '../../../styles/styled-components';
import { ImageFormGallery } from '../FormImageGallery';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

export function NewProductForm() {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(null);
  const [stock, setStock] = useState(0);

  const { register, handleSubmit, errors } = useForm();
  const { getLocalUrls, uploadImagesToS3 } = useUploadImage();
  const { post, put, get } = useFetch();
  const { store_id } = useParams();
  const history = useHistory();

  async function onSubmit({ name, description, delivery, pickup }) {
    const productModel = {
      name,
      description,
      delivery,
      pickup,
      price,
      store_id,
      stock_quantity: stock,
      created_at: getUnixTime(Date.now()),
    };
    try {
      const productRes = await post('products', productModel);
      if (productRes.request.status === 201) {
        const S3Urls = await uploadImagesToS3(imageFiles);
        await put(`products/${productRes.data.id}`, {
          images: S3Urls,
        });
        history.push(`/stores/${store_id}/inventory`);
      }
    } catch (error) {
      console.error('Error creating new product: ', JSON.parse(error));
    }
  }

  function onError() {
    if (!price) setPriceError({ message: 'Price required' });
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
    <StyledForm
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyPress={preventEnter}
    >
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
      <StyledGridContainer>
        <StyledInputGroup>
          <Input
            label="Name"
            placeholder="enter your product name..."
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
        <StyledContainer>
          <StyledInputGroup>
            <StyledLabel htmlFor="price">Price</StyledLabel>
            <StyledInputNumber
              formatter={value =>
                value ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="$0.00"
              onChange={v => setPrice(v * 100)}
              hasError={priceError}
            />
            {priceError?.message ? (
              <StyledErrorMessage>{priceError.message}</StyledErrorMessage>
            ) : null}
          </StyledInputGroup>
        </StyledContainer>
      </StyledGridContainer>
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

      <StyledContainer>
        <StyledInputGroup>
          <StyledLabel htmlFor="stock">Initial Stock</StyledLabel>
          <StyledInputNumber placeholder="0" onChange={v => setStock(v)} />
        </StyledInputGroup>
      </StyledContainer>

      <Input
        type="checkbox"
        label="Delivery"
        ref={register}
        id="delivery"
        name="delivery"
      />
      <Input
        type="checkbox"
        label="Pickup"
        ref={register}
        id="pickup"
        name="pickup"
      />

      <StyledButton type="submit">Add Product</StyledButton>
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
  margin: 0;
  height: max-content;

  .group_container {
    margin-bottom: 0;
  }
`;
const StyledErrorMessage = styled.p`
  position: absolute;
  color: red;
  margin-bottom: 0;
  right: 0;
  bottom: -24px;
`;

const StyledInputNumber = styled(InputNumber)`
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 52.5px;

  .ant-input-number-input-wrap {
    height: 100%;
  }

  .ant-input-number {
    display: flex;
    align-items: center;
  }
  .ant-input-number-input {
    height: 100%;
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border: 2px solid red;
    `}
`;

const StyledContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;
const StyledLabel = styled.label``;
