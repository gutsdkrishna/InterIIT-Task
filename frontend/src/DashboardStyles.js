import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f4f8;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.div`
  width: ${(props) => (props.$isOpen ? '300px' : '450px')};
  background-color: #ffffff;
  padding: 20px;
  overflow-y: auto;
  transition: width 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    width: ${(props) => (props.$isOpen ? '300px' : '0')};
    transition: width 0.3s ease, opacity 0.3s ease;
    opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #3498db;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const GodownTree = styled.ul`
  list-style-type: none;
  padding-left: 0;
  position: relative;
`;

export const GodownNode = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #3498db;
  }

  &:last-child::before {
    height: 20px;
  }

  @media (max-width: 768px) {
    padding-left: 10px;
  }
`;
export const GodownContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensure vertical alignment */
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  
  span {
    display: flex;
    align-items: center; /* Ensure the text/icon inside spans are aligned */
  }
`;

export const ViewItemsButton = styled.button`
  display: flex;
  align-items: center; /* Align the icon and text vertically */
  padding: 8px 12px;
  margin-left: auto; /* Push the button to the far right */
  background-color: ${(props) => (props.isSelected ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.isSelected ? '#fff' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#0056b3' : '#e0e0e0')};
  }
  
  svg {
    margin-right: 5px;
  }


  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 10px;
    justify-content: center;
  }
`;

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

export const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${ItemCard}:hover & {
    transform: scale(1.05);
  }
`;

export const ItemDetails = styled.div`
  padding: 15px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ItemName = styled.h3`
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ItemInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #34495e;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #3498db;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1001;
  }
`;

export const SearchBar = styled.input`
  width: 98%;
  padding: 10px;
  margin: 30px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 2px 10px rgba(52, 152, 219, 0.3);
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 8px;
    margin: 20px 0;
  }
`;


// Add this styled component for loading
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #555;
  height: 70%; // Adjust as necessary to fit your layout
`;
