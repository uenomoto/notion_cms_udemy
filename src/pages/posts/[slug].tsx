// 動的なページは[]をつける ※名前付きエクスポートはNG! 詳細ページ
import Head from "next/head";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { motion } from "framer-motion";
import { getAllPosts, getSinglePost } from "../../../lib/notionAPI";
import { Motions } from "../../utils/Motions";

// 動的ページはこれが必要↓
export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  // 動的に増えていく↓
  const paths = allPosts.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// post関係のページを固有に取得
export const getStaticProps = async ({ params }) => {
  const post = await getSinglePost(params.slug);
  return {
    props: {
      post,
    },
    // ISRを使用、10秒ごとに画面（HTML）を更新する。
    revalidate: 60 * 60 * 12,
  };
};

const Post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.metadata.title}</title>
      </Head>
      <Motions>
        <section className="container lg:px-2 px-5 lg:w-1/2 mx-auto mt-20 mb-10">
          <h2 className="w-full text-2xl font-bold">{post.metadata.title}</h2>
          <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
          <span className="text-gray-500">投稿日： {post.metadata.date}</span>
          <br />
          {post.metadata.tags.map((tag: string, index: number) => (
            <p
              className="text-white bg-sky-900 rounded-2xl font-medium mt-2 px-2 inline-block mr-2"
              key={index}
            >
              <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
            </p>
          ))}
          <div className="mt-10 font-medium">
            {/* コードをマークダウンにしてcodeを見やすくする。 */}
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post.markdown}
            </ReactMarkdown>

            <Link
              href="/"
              className="mt-8 mx-auto rounded-2xl text-right block"
            >
              <span className="mt-3 bg-sky-400 p-3 rounded-3xl text-xl text-white hover:bg-sky-700 transition duration-300">
                ←ホームに戻る
              </span>
            </Link>
          </div>
        </section>
      </Motions>
    </>
  );
};

export default Post;
