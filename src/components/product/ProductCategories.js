import React, { Component } from 'react'
import Creatable from 'react-select/creatable';


const options = [
  { value: 'sofas', label: 'Sofas' },
  { value: 'beds', label: 'Beds' },
  { value: 'tables', label: 'Tables' },
  { value: 'chairs', label: 'Chairs' },
  { value: 'mattresses', label: 'Mattresses' },
  { value: 'lamps', label: 'Lamps' },
  { value: 'dressers', label: 'Dressers' },
  { value: 'storage', label: 'Storage' },
  { value: 'drawers', label: 'Drawers' },
]

const ProductCategories = ({value,onChange}) => {
 return(  
      <Creatable options={options} value={value} onChange={onChange}/>
 )
}

export default ProductCategories;