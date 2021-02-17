import axios from 'axios';
import { useFetch } from './useFetch';

export function useUploadImage() {
  const { post } = useFetch();

  async function getSignedUrl(file) {
    const fileName = file.name.split('.')[0];
    const fileType = file.name.split('.')[1];

    try {
      const res = await post('sign_s3', { fileName, fileType });
      return res;
    } catch (error) {
      console.error('Error getting signed url', file, error);
    }
  }

  async function uploadImageToS3(file, signedUrlRes) {
    const fileName = file.name.split('.')[0];
    const fileType = file.name.split('.')[1];
    const options = { headers: { 'Content-Type': fileType } };
    const signedRequest = signedUrlRes.data.signedRequest;

    try {
      const uploadRes = await axios.put(signedRequest, file, options);
      return uploadRes;
    } catch (error) {
      console.error('Error uploading image to S3', fileName, error);
    }
  }

  async function uploadImagesToS3(files) {
    const signedUrlReqs = Array.from(files).map(file => getSignedUrl(file));
    const signedUrlRes = await Promise.all(signedUrlReqs);

    const filesWithSignedUrlRes = Array.from(files).map(file => {
      const fileName = file.name.split('.')[0];
      let signedUrlResponse;

      signedUrlRes.forEach(res => {
        if (fileName === res.data.fileName) {
          signedUrlResponse = res;
        }
      });

      return { file, signedUrlResponse };
    });

    const uploadReqs = filesWithSignedUrlRes.map(obj =>
      uploadImageToS3(obj.file, obj.signedUrlResponse)
    );
    const uploadRes = await Promise.all(uploadReqs);

    const s3Urls = signedUrlRes.map(res => res.data.url);
    console.log({
      s3Urls,
      signedUrlRes,
      files,
      uploadRes,
      filesWithSignedUrlRes,
    });
    return s3Urls;
  }

  function getLocalUrls(files) {
    const localUrls = Array.from(files)
      .map(file => URL.createObjectURL(file))
      .slice(0, 5);

    Array.from(files).map(file => URL.revokeObjectURL(file));

    return localUrls;
  }

  return { getLocalUrls, uploadImagesToS3 };
}
