// ページネーション用動的ページ

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  getAllTags,
  getNumberOfPages,
  getNumberOfPagesByTag,
  getPostsByPage,
  getPostsByTagAndPage,
} from "../../../../../../lib/notionAPI";
import { SinglePost } from "../../../../../../components/Post/SinglePost";
import { Pagination } from "../../../../../../components/Pagination/Pagination";
import { Tag } from "../../../../../../components/Tag/Tag";
import { Motions } from "../../../../../utils/Motions";

//動的に画面に変える時に必須君↓タグに応じて
export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  // 空の配列
  let params = [];

  // 非同期処理が同時に２つあるとうまく動かないからPromise.allを使用（今回はallTagsとgetNumberOfPagesByTagで使っている）
  await Promise.all(
    //全てのタグを取得し
    allTags.map((tag: string) => {
      // タグに応じて関係のある記事のページネーションの数を出す
      return getNumberOfPagesByTag(tag).then((numberOfPageByTag: number) => {
        //thenで成功したら そのタグのある記事がある数ぶんfor文で繰り返し処理
        for (let i = 1; i <= numberOfPageByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

  // console.log(params);

  return {
    paths: params,
    fallback: "blocking",
  };
};

// タグ検索によりフィルターされた記事を取得する（ページネーション付き）
export const getStaticProps: GetStaticProps = async (context) => {
  // 現在のタグとページ数を取得する
  const currentPage: string = context.params?.page.toString();
  const currentTag: string = context.params?.tag.toString();

  // tagNameの最初の一文字だけ大文字にするメソッド
  const upperCaseCurrentTag =
    currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  // postsの中には現在のタグとページ数がわかるメソッド
  const posts = await getPostsByTagAndPage(
    upperCaseCurrentTag,
    parseInt(currentPage, 10)
  );

  // propsでPagination.tsxに渡すための記述（内容はタグに応じてのページネーションの数を取得する）
  const numberOfPageByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

  const allTags = await getAllTags();

  return {
    props: {
      posts,
      numberOfPageByTag,
      currentTag,
      allTags,
    },
    // ISRを使用、10秒ごとに画面（HTML）を更新する。
    revalidate: 60 * 60 * 12,
  };
};

// JSX↓
const BlogTagPageList = ({ numberOfPageByTag, posts, currentTag, allTags }) => {
  // console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Motions>
        <main className="container w-full mt-16">
          <h1 className="md:text-5xl text-2xl font-medium text-center mb-16">
            {currentTag}関連記事🐥
          </h1>
          <section className="sm:grid lg:grid-cols-2 md:grid-cols-2 w-5/6 gap-4 xl:w-8/12 mx-auto">
            {posts.map((post) => (
              <div key={post.id}>
                <SinglePost
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                  image={post.image}
                  isPagenationPage={true}
                />
              </div>
            ))}
          </section>
          <Pagination numberOfPage={numberOfPageByTag} tag={currentTag} />
          <Tag tags={allTags} />
        </main>
      </Motions>
    </div>
  );
};

export default BlogTagPageList;
