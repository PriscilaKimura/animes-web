import styled from 'styled-components';

export const SearchBox = styled.div`
  max-width: 600px;
  margin: 0 auto 24px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
`;

export const SearchTitle = styled.h2`
  margin: 0 0 8px;
  color: #4a1d7e;
  font-size: 1.3rem;
`;

export const SearchHint = styled.p`
  margin: 8px 0;
  color: #555;
  font-size: 0.95rem;
  text-align: left;
`;

export const SearchError = styled.p`
  margin: 8px 0;
  color: #9b2929;
  text-align: left;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ResultsList = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ResultItem = styled.li`
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
`;

export const ResultCover = styled.img`
  width: 56px;
  height: 78px;
  object-fit: cover;
  border-radius: 4px;
  background: #eee;
`;

export const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;

  strong {
    color: #4a1d7e;
  }

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const ResultButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: #1890ff;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
`;
