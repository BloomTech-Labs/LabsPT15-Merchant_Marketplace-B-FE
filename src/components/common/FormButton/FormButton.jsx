import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const FormButton = ({
  setProgress,
  slider,
  progressPercent,
  text,
  review,
  popContent,
}) => {
  const history = useHistory();
  return (
    <StyledFormButton>
      <Button
        className="CancellBtn"
        onClick={() => history.push('/myprofile/inventory')}
      >
        Cancel
      </Button>
      {!review ? (
        <Button
          className="NextBtn"
          htmlType="submit"
          onClick={() => {
            setProgress(progressPercent);
            slider.current.next();
          }}
        >
          {text}
        </Button>
      ) : (
        <Button
          className="NextBtn"
          htmlType="submit"
          onClick={() => {
            console.log('showing pop content');
            popContent();
          }}
        >
          {text}
        </Button>
      )}
    </StyledFormButton>
  );
};

const StyledFormButton = styled.div`
  display: flex;
  justify-content: space-between;

  .NextBtn {
    background-color: lightgray;
    border: 1px solid black;
  }
  .CancellBtn {
    border: 1px solid black;
  }
`;
