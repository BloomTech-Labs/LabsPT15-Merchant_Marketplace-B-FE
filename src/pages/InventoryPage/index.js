import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import './inventoryStyles.css';
import NewItem from '../../components/inventory/newItem/main_info';
import Specifications from '../../components/inventory/newItem/specifications';
import { AddPhotos } from '../../components/inventory/newItem/photos';
import Finalize from '../../components/inventory/newItem/review_product';
import ProgressBar from '../../components/common/progressBar/progressBar';
import { NavBar } from '../../components/common/NavBar';
import { useOktaAuth } from '@okta/okta-react';
import { useFetch } from '../../hooks/useFetch';

export function Inventory() {
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
    <>
      <NavBar />
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
    </>
  );
}
