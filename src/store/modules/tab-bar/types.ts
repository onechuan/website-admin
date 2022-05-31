export interface ITagProps {
  title: string;
  name: string;
  fullPath: string;
  query?: any;
}

export interface ITabBarState {
  tagList: ITagProps[];
  cacheTabList: Set<string>;
}
