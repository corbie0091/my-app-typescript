import React from 'react';
import { CountProvider } from '../../components/ContextExample/Contexts';
import { CountLabel } from '../../components/ContextExample/Contexts/Countlabel';
import { PlusButton } from '../../components/ContextExample/Contexts/PlusButton';
export const ContextExample = () => {
  return (
    <CountProvider>
      <CountLabel />
      <PlusButton />
    </CountProvider>
  );
};
