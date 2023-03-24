import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
// notionのライブラリをインスタンス化
const n2m = new NotionToMarkdown({ notionClient: notion });

// 全てのデータを取得するAPI
export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

// Getメタデータ取得関数 この長ったらしいのはコンソールで取得し確認する これで他のファイルでは短く書いても取得できる
const getPageMetaData = (post) => {
  // ↓タグの中のnameだけの取得のためのmap関数 mapの理由はタグは一つだけじゃないから
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name;
    });

    return allTags;
  };

  // 画像が存在しない場合や空の配列の場合のための条件付き処理
  const getImageUrl = (image) => {
    const defaultImageUrl = "/default-image.png"; //nullの場合の代替画像
    if (image && image.files && image.files.length > 0) {
      return image.files[0].file.url;
    } else {
      return defaultImageUrl; // 画像がない場合の代替画像
    }
  };

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    image: getImageUrl(post.properties.Image),
  };
};

// 固有のページを取得API（Showpage）
export const getSinglePost = async (slug) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  // console.log(metadata);
  // ↓ドキュメントそのまま マークダウンを見やすくする
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  // console.log(mdString);
  return {
    metadata,
    markdown: mdString,
  };
};

// トップページ用記事の取得（一画面に4つの記事）
export const getPostsTopPage = async (pageSize: number) => {
  // まずは全てのデータを取得し変数に格納
  const allPosts = await getAllPosts();
  // sliceを使い４つずつカットしていく
  const fourPosts = allPosts.slice(0, pageSize);
  return fourPosts;
};

// ページ番号に応じた記事を取得 NUMBER_OF_POSTS_PER_PAGEは４が格納されてる
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;

  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return allPosts.slice(startIndex, endIndex);
};

//全ての記事に対してのページネーション機能
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts();
  // console.log(
  //   Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
  //     (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  // );

  // まずは小数点を四捨五入、全てのページを取得（現時点で10ページ）、割ることの今回は４ページずつだから４、10 / 4 = 2...2
  // だが、二ページだと足りなく残りの２記事も出したいため＋１をするには％使ってあまりの数を求める。
  // 今回の場合、10%4余が2だから　2 > 0 trueなので１が出る。そのため三ページ取得できる。もし割り切れたらページの追加なし
  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

// 指定したタグしか画面に出さないようにする
export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts(); //記事を全部取得
  // 全ての記事にフィルターをかけて記事の中のタグを取得タグと実際のタグが一致するものだけを残す
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );
  // console.log(posts);

  // 動的にページを変化させる（例）3ページなら3ページ5ページなら5ページと変わる
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;

  return posts.slice(startIndex, endIndex);
};

// タグに応じてのページネーションの数を取得する
export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  return (
    // 必ずタグをフィルターした変数から計算させる
    Math.floor(posts.length / NUMBER_OF_POSTS_PER_PAGE) +
    (posts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  );
};

// 全てのタグを一つずつ取得。
export const getAllTags = async () => {
  // まずは全ての記事を取得
  const allPosts = await getAllPosts();

  // 変数にタグのみを全部取得するメソッドを格納だがこのままだと配列をフラットにしても重複してしまう。
  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);

  // Setインスタンスを使用してあげれば重複してるものを一つずつ取得できる。
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);
  // console.log(allTagsList);

  return allTagsList;
};
