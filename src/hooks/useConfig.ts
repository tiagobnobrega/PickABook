import React from 'react';
import pickABookConfig, { PickABookConfig } from '../config/config';

export const ConfigContext = React.createContext<
    PickABookConfig
    >(pickABookConfig);

const useConfig = ():PickABookConfig=>React.useContext<PickABookConfig>(ConfigContext)
export default useConfig;