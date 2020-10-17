import { useState } from 'react';

const useTest = (nameEn: string) => {
  const [name, setName] = useState('nameEn');
  const setNameFn = (nameEn2: string) => {
    setName(nameEn2);
  };
  console.log('namehooks', name);
  return {
    name,
    setNameFn,
  };
};
export default useTest;
