import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useProfile } from '../../../contexts/profile/ProfileProvider';
import { InventoryIcon, OrdersIcon, SettingsIcon } from '../../icons';

export function StoresMenuList() {
  const { store_id } = useParams();
  const profile = useProfile();
  const history = useHistory();

  function onMenuItemSelection(e, id) {
    history.push(`/stores/${id}/${e.target.textContent.toLowerCase()}`);
  }

  function onStoreSelection(id) {
    history.push(`/stores/${id}/inventory`);
  }

  console.log({ profile });

  return profile?.stores?.length ? (
    <StyledContainer>
      {profile.stores.map(store => {
        return (
          <div key={store.id}>
            <StyledStoreName onClick={() => onStoreSelection(store.id)}>
              <StylesStoreImg source={store.images[0]} />
              {store.name}
            </StyledStoreName>

            {Number(store_id) === store.id ? (
              <>
                <StyledMenuItem
                  onClick={e => onMenuItemSelection(e, store.id)}
                  isSelected={history.location.pathname.includes('inventory')}
                >
                  <InventoryIcon />
                  Inventory
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={e => onMenuItemSelection(e, store.id)}
                  isSelected={history.location.pathname.includes('orders')}
                >
                  <OrdersIcon />
                  Orders
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={e => onMenuItemSelection(e, store.id)}
                  isSelected={history.location.pathname.includes('settings')}
                >
                  <SettingsIcon />
                  Settings
                </StyledMenuItem>
              </>
            ) : null}
          </div>
        );
      })}
    </StyledContainer>
  ) : null;
}

const StyledContainer = styled.div``;
const StyledStoreName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 14px 0;
`;
const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  svg {
    margin-right: 8px;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: #e7e8ec;
    `}
`;

const StylesStoreImg = styled.div`
  height: 52.5px;
  width: 52.5px;
  background: #e8e8e8;
  border-radius: 12px;
  margin-right: 12px;
  ${({ source }) => {
    return (
      source &&
      css`
        height: 52.5px;
        width: 52.5px;
        background: url(${source});
        background-position: center;
        background-size: cover;
        border-radius: 12px;
        margin-right: 12px;
      `
    );
  }}
`;
