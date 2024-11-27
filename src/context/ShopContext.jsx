import React, { useEffect, useState } from "react";
import axios from "axios";
// import { products } from "../assets/frontend_assets/assets";
import { createContext } from "react";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token,setToken]= useState("")
  const [showSearch,setShowSearch]=useState(false)
  const [products,setProducts]= useState([])
  const [search,setSearch]=useState("")
  const [cartItem,setCartItem ]=useState({})
  const navigate = useNavigate()
  const addToCart =async(itemId,size)=>{
    if(!size){
      toast.error("Select size product ")
      return;
    }
    const cartData = structuredClone(cartItem)
    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1// cartData[itemId][size]= cartData.aaa.L =1 =>1+1=2
      }
      else{
        cartData[itemId][size] = 1;
      }
    }
    else{
        cartData[itemId] ={}
        cartData[itemId][size] = 1
    }
    setCartItem(cartData)
    if(token){
      try {
        await axios.post(backendUrl+"/api/cart/add",{itemId,size},{headers:{token}})
      } catch (error) {
        toast.error(error.message)
      }
    }
  } 
  const getCartCount = ()=>{
    let totalCount =0
    for(const items in cartItem){
       for (const item in cartItem[items]) {
         console.log("day la item", items, item);
         try {
           if (cartItem[items][item] > 0) {
             totalCount += cartItem[items][item];
           }
         } catch (error) {}
       }
    }
    console.log(totalCount);
    return totalCount;
  }
  const updateQuantity = async (itemId,size, quantity)=>{
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    
    setCartItem(cartData)
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size,quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  const getCartAmount= ()=>{
    let totalAmount =0
    for(const items in cartItem){
      let itemInfo = products.find(product=>product._id===items)
      for(const item in cartItem[items]){
        try {
          if(cartItem[items][item]>0)
          {
            totalAmount+=itemInfo.price*cartItem[items][item]

          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount;
  }
  const getProductsData=async ()=>{
    try {
      // console.log(backendUrl + "api/product/list");
      const response = await axios.get(backendUrl+"/api/product/list")
      console.log(response.data)
      if(response.data.success){
        setProducts(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      
    }
  }
  const getUserCart =async (token)=>{
   try {
    const response = await axios.post(backendUrl+"/api/cart/get",{},{headers:{token} })
    if(response.data.success){
      setCartItem(response.data.cartData)
    }
   }
    catch (error) {
    console.log(error.message)
   }
  }
  useEffect(()=>{
    getProductsData()
  },[])
  useEffect(()=>{
    if(!token&&localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
    }
  },[])
  useEffect(()=>{
    console.log(cartItem)
  },[cartItem])
  const currency = `$`;
  const delivery_fee =10
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
