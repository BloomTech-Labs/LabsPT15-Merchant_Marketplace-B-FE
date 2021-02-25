import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useProfile } from '../../../contexts/profile/ProfileProvider';
import {
  ExpandIcon,
  InventoryIcon,
  OrdersIcon,
  SettingsIcon,
} from '../../icons';

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

  function onStoreExpand(id) {
    history.push(`/stores/${id}`);
  }

  return profile?.stores?.length ? (
    <StyledContainer>
      {profile.stores.map(store => {
        return (
          <div key={store.id}>
            <StyledNameContainer>
              <StylesStoreImg source={store.images[0]} />
              <StyledStoreName onClick={() => onStoreSelection(store.id)}>
                {store.name}
              </StyledStoreName>
              <ExpandIcon onClick={() => onStoreExpand(store.id)} />
            </StyledNameContainer>

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
const StyledNameContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  margin-bottom: 14px;
  align-items: center;

  svg {
    margin-left: 8px;
  }
`;

const StyledStoreName = styled.div`
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
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
