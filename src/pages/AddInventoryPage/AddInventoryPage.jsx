import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import NewItem from '../../components/inventory/newItem/main_info';
import Specifications from '../../components/inventory/newItem/specifications';
import { AddPhotos } from '../../components/inventory/newItem/photos';
import Finalize from '../../components/inventory/newItem/review_product';
import { ProgressBar } from '../../components/common/ProgressBar';
import { useFetch } from '../../hooks/useFetch';
import { Layout } from '../../components/common/Layout/Layout';

export function AddInventoryPage() {
  // State for each form section
  const [mainInfo, setMainInfo] = useState({});
  const [specForm, setSpecForm] = useState({});
  const [photos, setPhotos] = useState({});

  const { post } = useFetch();

  const formCosolidate = () => {
    const completeObject = {
      ...mainInfo,
      ...specForm,
      ...photos,
    };
    post('item', completeObject);
  };

  // Progress Bar Sync
  const [progressPoint, setProgressPoint] = useState(1);
  const [progressStatus, setProgressStatus] = useState('active');

  // Form Pointer for antD
  const slider = useRef(null);

  return (
    <Layout>
      <StyledInventory>
        <div className="outerContainer">
          <div className="formContainer">
            <ProgressBar percent={progressPoint} status={progressStatus} />
            <Carousel ref={slider}>
              <NewItem
                slider={slider}
                setData={setMainInfo}
                setProgress={setProgressPoint}
              />
              <Specifications
                slider={slider}
                setData={setSpecForm}
                setProgress={setProgressPoint}
              />
              <AddPhotos
                slider={slider}
                setProgress={setProgressPoint}
                setData={setPhotos}
              />
              <Finalize
                slider={slider}
                setStatus={setProgressStatus}
                setProgress={setProgressPoint}
                formCosolidate={formCosolidate}
              />
            </Carousel>
          </div>
        </div>
      </StyledInventory>
    </Layout>
  );
}

const StyledInventory = styled.div`
  .outerContainer {
    margin-top: 7rem;
  }

  .contents {
    margin: 0 auto;
    max-width: 700px;
  }
  .formContainer {
    max-width: 500px;
    margin: 0 auto;
  }

  .confButton {
    margin: 0 auto;
  }

  .popContent {
    display: flex;
    flex-flow: column;
  }

  .displayedNone {
    display: none;
  }
  .spec-inputs {
    margin: 10%;
  }

  h1 {
    text-align: center;
  }

  .supplement-detail {
    color: lightgray;
  }
`;
