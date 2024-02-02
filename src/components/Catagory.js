import React from "react";
import a from '../img/foods/Reuben Style Hot Dog.jpg'
import b from '../img/foods/Salmon Nigiri.jpg'
import c from '../img/foods/Sashimi Platter.jpg'
import d from '../img/foods/Shrimp Scampi.jpg'
import e from '../img/foods/Smoked BBQ Brisket.jpg'
import f from '../img/foods/Southern-Style Chicken Biscuit.jpg'
import g from '../img/foods/Spicy Buffalo Wings.jpg'
import h from "../img/foods/Spicy Jalapeño Burger.jpg"
import i from '../img/foods/Spicy Moroccan Lamb Chops.jpg'
import j from '../img/foods/Teriyaki Glazed Chicken Thighs.jpg'
import k from '../img/foods/Teriyaki Pineapple Pleasure.jpg'
import l from '../img/foods/Thai Red Curry.jpg'
import m from '../img/foods/Vegetarian Pad Thai.jpg'
import n from '../img/foods/Veggie Dog with Sauerkraut.jpg'
import o from '../img/foods/Veggie Extravaganza.jpg'
import p from '../img/foods/Veggie Roll.jpg'
import q from '../img/foods/Veggie Supreme.jpg'
function Catagory() {
  return (
    <div className="carousel rounded-box flex gap-3 my-6">
      <div className="carousel-item">
        <img
          src={a}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={b}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={c}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={d}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={e}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={f}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
      <div className="carousel-item">
        <img
          src={g}
          alt="Burger"
          className='w-[25vw] h-[34vh] border-2 rounded-[50%]'
        />
      </div>
    </div>
  );
}

export default Catagory;
