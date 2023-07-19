'use client'

import { urlCsv } from '../../utils/urls';
import Header from '../components/Header';

import React from 'react';
import axios from 'axios';

export default function Csv() {
  const handleExportClick = () => {
    const userId = localStorage.getItem('id')
    console.log(userId)
    axios.get(urlCsv, { params: { id: Number(userId) }, responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'conversation.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error exporting data:', error);
      });
  };

  return ( 
    <div>
      <Header />
      <button onClick={handleExportClick}>Export to CSV</button>
    </div>
  );
}

