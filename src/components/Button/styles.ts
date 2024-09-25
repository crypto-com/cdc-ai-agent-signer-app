import { styled } from 'styled-components';
import { ButtonProps } from '.';

export const StyledButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff; 
  border-radius: 40px;
  background: transparent; 
  color: white; 
  cursor: pointer;
  height: 54px;
  padding: 13px 24px;
  width: auto;
  transition: background 0.3s ease;

  &:hover,
  &:focus {
    border: 1px solid #fff;
    background: #000000b0 !important;
    color: #fff !important; 

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6; 
  }
`;

export const StyledButtonText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 110%;
  white-space: pre-wrap;
`;
