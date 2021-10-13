import React from 'react'
import PropTypes from "prop-types"

export const FilterContacts = ({filtered}) => {
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

FilterContacts.propTypes={
   filtered:PropTypes.func.isRequired
}