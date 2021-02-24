import { StyleProp } from 'react-native';

export interface UseRestyleAsStyleProp<T=any>{style:StyleProp<T>[]}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
