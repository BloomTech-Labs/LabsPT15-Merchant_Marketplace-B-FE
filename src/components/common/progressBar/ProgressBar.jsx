import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

export function ProgressBar(props) {
  return (
    <StyledProgressBar className="progressContainer">
      <Progress percent={props.percent} status={props.status} />
    </StyledProgressBar>
  );
}

const StyledProgressBar = styled.div`
  .progressContainer {
    margin: 0 auto 2rem;
    max-width: 500px;
  }
`;

// This comment is to commit the change to the folder name so they are uniform.
