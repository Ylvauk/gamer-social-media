import React, { useState, useEffect, useRef } from 'react';
import Posts from './Posts';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const MainPage = () => {

    return (
        <div>
            <Posts/>
        </div>
    );
};

export default MainPage;