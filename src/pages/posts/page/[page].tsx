// ページネーション用動的ページ

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import {
  getAllTags,
  getNumberOfPages,
  getPostsByPage,
  getPostsTopPage,
} from "../../../../lib/notionAPI";
import { SinglePost } from "../../../../components/Post/SinglePost";
import { Pagination } from "../../../../components/Pagination/Pagination";
import { Tag } from "../../../../components/Tag/Tag";
import { motion } from "framer-motion";
import { Motions } from "../../../utils/motions";

// 動的なページ数のために必要なロジック
export const getStaticPaths: GetStaticPaths = async () => {
  // 今現在のページ数を取得
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

// ページネーション
export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;

  const postsByPage = await getPostsByPage(
    parseInt(currentPage.toString(), 10)
  );
  // 今現在のページ数を取得
  const numberOfPage = await getNumberOfPages();
  // console.log(numberOfPage);

  const allTags = await getAllTags();

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
    },
    // ISRを使用、30秒ごとに画面（HTML）を更新する。
    revalidate: 30,
  };
};

// JSX↓
const BlogPageList = ({ postsByPage, numberOfPage, allTags }) => {
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
        <div className="container w-full mt-16">
          <h1 className="text-5xl font-medium text-center mb-16">
            Notion Blog🚀
          </h1>
          <section className="sm:grid lg:grid-cols-2 md:grid-cols-2 w-5/6 gap-4 xl:w-8/12 mx-auto">
            {postsByPage.map((post) => (
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
          <Pagination numberOfPage={numberOfPage} tag={""} />
          <Tag tags={allTags} />
        </div>
      </Motions>
    </div>
  );
};

export default BlogPageList;
