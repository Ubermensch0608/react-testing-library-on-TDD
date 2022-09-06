import { createContext, useContext, useMemo, useState } from 'react';

export const ScoopsContext = createContext();

const useScoops = () => {
  const context = useContext(ScoopsContext);
  if (!context) {
    throw new Error('useScoops must be used within a ScoopsProvider');
  }
  return context;
};

export const ScoopsProvider = (props) => {
  const [scoops, setScoops] = useState(0);
  const value = useMemo(() => [scoops, setScoops], [scoops]);

  return <ScoopsContext.Provider value={value} {...props} />;
};

export default useScoops;
