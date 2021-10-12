import React from 'react'

export const FilterContacts = ({filtered}) => {
    console.log(filtered)
   return(
      
       <>
          <h2>Find contacts by name</h2>
            <input
            type="text"
            name="filter"
            placeholder="start typing"
            onChange={filtered}
            />
            </>)
}
