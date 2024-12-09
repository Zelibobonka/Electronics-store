import styled from "styled-components";

const Label = styled.label`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export default Label;
