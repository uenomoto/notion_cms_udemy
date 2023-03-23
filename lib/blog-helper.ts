// タグがあるならtrueなくて全記事取得ならfalseページネーションの遷移先条件分岐

export const getPageLink = (tag: string, page: number) => {
  return tag ? `/posts/tag/${tag}/page/${page}` : `/posts/page/${page}`;
};
