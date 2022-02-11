import React from 'react'

const Search = ({searchData}) => {
  console.log(searchData && searchData.data && searchData.data.content)
  return (
    <div>Search</div>
  )
}

export default Search