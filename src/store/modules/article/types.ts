export interface IArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  cover: string;
  desc: string;
  tags: string[];
  category: string;
  createAt: string;
  updateAt: string;
}

export interface IArticleState {
  articleList: IArticle[];
}
