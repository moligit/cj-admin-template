import { useState } from 'react';

const useTestModel = (nameEn: string) => {
  const [name, setName] = useState(nameEn);
  const setNameFn = (nameEn2: string) => {
    setName(nameEn2);
  };
  console.log('namemodel', name);
  return {
    name,
    setNameFn,
  };
};
export default useTestModel;
