import React from 'react';
import uploadcare from 'uploadcare-widget';

import FormButton from '../../common/FormButton/FormButton';
import { useFetch } from '../../../hooks/useFetch';

export function AddPhotos({ setProgress, slider, setItem }) {
  const { post } = useFetch();

  function openUploadDialog(e) {
    let dialog = uploadcare.openDialog(null, {
      publicKey: '7f074009b333b2d5be63',
      imagesOnly: true,
    });
    dialog.done(function(file, fileGroup, list) {
      file.promise().done(function(fileInfo) {
        post('photos', { url: fileInfo.originalUrl, item_id: 15 });
      });
    });
  }

  return (
    <div className="contents">
      <h1>Add photos of the item</h1>
      <div
        onClick={openUploadDialog}
        className="ant-upload ant-upload-select ant-upload-select-picture-card"
      >
        +
      </div>

      <FormButton
        setProgress={setProgress}
        slider={slider}
        progressPercent={60}
        text="Next"
      />
    </div>
  );
}
