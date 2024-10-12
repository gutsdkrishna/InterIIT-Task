import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DashboardContainer, Sidebar, Main, Title, GodownTree, GodownNode,
  GodownContent, ViewItemsButton, ItemsList, ItemCard, ItemImageContainer,
  ItemImage, ItemDetails, ItemName, ItemInfo, MenuButton, SearchBar, LoadingSpinner
} from './DashboardStyles';

export default function Dashboard() {
  const [godowns, setGodowns] = useState([]);
  const [selectedGodown, setSelectedGodown] = useState(null);
  const [items, setItems] = useState([]);
  const [expandedGodowns, setExpandedGodowns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingGodowns, setLoadingGodowns] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5006/api/godowns')
      .then(response => {
        setGodowns(response.data);
        setLoadingGodowns(false);
      })
      .catch(error => {
        console.error('Error fetching godowns:', error);
        setLoadingGodowns(false);
      });
  }, []);

  const handleGodownClick = (godownId) => {
    setSelectedGodown(godownId);
    setLoadingItems(true);
    axios.get(`http://localhost:5006/api/items?godown_id=${godownId}`)
      .then(response => {
        setItems(response.data);
        setLoadingItems(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoadingItems(false);
      });

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleGodown = (godownId) => {
    setExpandedGodowns(prevState => ({
      ...prevState,
      [godownId]: !prevState[godownId]
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTree = (parentId) => {
    const children = godowns.filter(godown => godown.parent_godown === parentId);
    if (children.length === 0) return null;

    return (
      <GodownTree>
        {children.map((child) => {
          const hasChildren = godowns.some(godown => godown.parent_godown === child.id);

          return (
            <GodownNode key={child.id}>
              <GodownContent onClick={() => hasChildren ? toggleGodown(child.id) : handleGodownClick(child.id)}>
                <span>
                  {expandedGodowns[child.id] ? '▼' : '▶'}
                  <span style={{ marginLeft: '5px' }}>{child.name}</span>
                </span>
                {!hasChildren && (
                  <ViewItemsButton onClick={() => handleGodownClick(child.id)}>
                    View Items
                  </ViewItemsButton>
                )}
              </GodownContent>
              {expandedGodowns[child.id] && renderTree(child.id)}
            </GodownNode>
          );
        })}
      </GodownTree>
    );
  };

  return (
    <DashboardContainer>
      <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </MenuButton>
      <Sidebar $isOpen={isSidebarOpen}>
        <Title>Godowns</Title>
        {loadingGodowns ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : (
          renderTree(null)
        )}
      </Sidebar>
      <Main>
        <Title>Item Details</Title>
        <SearchBar
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {loadingItems ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : filteredItems.length === 0 && searchTerm.trim() !== '' ? (
          <p>No items found for this search term</p>
        ) : (
          <ItemsList>
            {filteredItems.map(item => (
              <ItemCard key={item.item_id}>
                <ItemImageContainer>
                  <ItemImage src={item.image_url} alt={item.name} />
                </ItemImageContainer>
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemInfo>Category: {item.category}</ItemInfo>
                  <ItemInfo>Price: ${item.price}</ItemInfo>
                  <ItemInfo>Brand: {item.brand}</ItemInfo>
                  <ItemInfo>Quantity: {item.quantity}</ItemInfo>
                </ItemDetails>
              </ItemCard>
            ))}
          </ItemsList>
        )}
      </Main>
    </DashboardContainer>
  );
}
