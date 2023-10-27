import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import Logo from './img/Black_and_White_Monogram_Business_Logo-removebg-preview.png';
import Practice from './img/1291767_aim_center_precision_target_dartboard_icon.svg';
import Compete from './img/8684579_medal_champion_award_winner_olympic_icon.svg';
import Book from './img/2203529_app_block_menu_setting_tile_icon.svg';
import Account from './img/370076_account_avatar_client_male_person_icon.svg';
import Notification from './img/9044954_notification_filled_icon.svg';
import Login from './Modals/Login1';

function Navbar() {

  return (
    <>
      <nav className="bg-purple-400 p-4 flex justify-between items-center h-12">
        <a href='/' className="flex w-36">
          <img src={Logo} alt='Logo'></img>
        </a>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-200" viewBox="0 0 20 20"></svg>
          </span>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-slate-300 w-full border border-slate-300 rounded-xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search" type="text" name="search" />
        </label>

        <ul className="flex space-x-4 text-white">
          <li>
            <img src={require('./img/1291767_aim_center_precision_target_dartboard_icon.svg')} class=" w-2 h-2"></img>
            {/* <a href="/practice" className="hover:text-gray-300 h-4 w-4">Practice</a> */}
          </li>
          <li>
            <a href="/compete" className="hover:text-gray-300 h-2 w-2">Compete</a>
          </li>
          <li>
            <a href="/learn" className="hover:text-gray-300">Learn</a>
          </li>
        </ul>

        <ul className="flex space-x-4 text-white">
          <li>
            <Link to='/login'>Account</Link>
          </li>
          <li>
            <a href="/notifications" className="hover:text-gray-300 h-2">Notification</a>
          </li>
          <li>
            <a href="/menu" className="hover:text-gray-300 h-2">Menu</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
