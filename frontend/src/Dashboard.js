import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DashboardContainer, Sidebar, Main, Title, GodownTree, GodownNode,
  GodownContent, ViewItemsButton, ItemsList, ItemCard, ItemImageContainer,
  ItemImage, ItemDetails, ItemName, ItemInfo, MenuButton, SearchBar, LoadingSpinner,
  FilterContainer, CategorySelect, LogoutButton
} from './DashboardStyles';
import useAuth from './useAuth'; // Adjust the import path as necessary
import { supabase } from './supabase'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {

useAuth(); 
  const navigate = useNavigate(); // Get navigate from React Router

     const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out the user
    navigate('/'); // Redirect to login page after logout
  };



  const [godowns, setGodowns] = useState([]);
  const [selectedGodown, setSelectedGodown] = useState(null);
  const [items, setItems] = useState([]);
  const [expandedGodowns, setExpandedGodowns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [loadingGodowns, setLoadingGodowns] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/godowns')
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
    axios.get(`http://localhost:5001/api/items?godown_id=${godownId}`)
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

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);

    if (searchQuery.length > 0 || selectedCategory) {
      setLoadingItems(true);
      try {
        // Make API call with both search term and category
        const response = await axios.get('http://localhost:5001/api/search-items', {
          params: {
            search_term: searchQuery,
            category: selectedCategory, // Add category to query params
          },
        });
        setItems(response.data); // Set the global search results
        setLoadingItems(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoadingItems(false);
      }
    } else {
      setItems([]); // Clear items if both search and category are empty
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    
    // Trigger the search again with the new category filter
    handleSearch({ target: { value: searchTerm } });
  };





    
  
  

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
                  {expandedGodowns[child.id] ? '▼  ' : '▶  '}
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
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Title>Item Details</Title>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>

        {/* <Title>Item Details</Title> */}
        <FilterContainer>
          <SearchBar
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <CategorySelect value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Toys">Toys</option>
            <option value="Tools">Tools</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            {/* Add more categories as needed */}
          </CategorySelect>
        </FilterContainer>

        {loadingItems ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : items.length === 0 && searchTerm.trim() !== '' ? (
          <p>No items found for this search term</p>
        ) : (
          <ItemsList>
            {items.map(item => (
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
