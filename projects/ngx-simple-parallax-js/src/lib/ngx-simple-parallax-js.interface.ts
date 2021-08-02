export interface IParallaxConfig {
  orientation?: 'up' | 'down' | 'left' | 'right' | 'up left' | 'up right' | 'down left' | 'down right';
  scale?: number;
  overflow?: boolean;
  delay?: number;
  transition?: string;
  breakpoint?: number;
  customContainer?: string | HTMLElement;
  customWrapper?: string;
  maxTransition?: number;
}
