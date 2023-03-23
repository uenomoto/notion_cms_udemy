// 動的なページは[]をつける ※名前付きエクスポートはNG! 詳細ページ
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { getAllPosts, getSinglePost } from "../../../lib/notionAPI";

// 動的ページはこれが必要↓
export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  // 動的に増えていく↓
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  return {
    // { params: { slug: "first" } },
    // { params: { slug: "second" } },
    // { params: { slug: "third" } },
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
    // ISRを使用、6時間ごとに画面（HTML）を更新する。
    revalidate: 60 * 60 * 6,
  };
};

const Post = ({ post }) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20 mb-10">
      <h2 className="w-full text-2xl font-medium">{post.metadata.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-sky-900"></div>
      <span className="text-gray-500">投稿日： {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag: string, index: number) => (
        <p
          className="text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
          key={index}
        >
          <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
        </p>
      ))}
      <div className="mt-10 font-medium">
        {/* コードをマークダウンにしてcodeを見やすくする。 */}
        <ReactMarkdown
          children={post.markdown}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        ></ReactMarkdown>

        <Link href="/">
          <span className="pb-20 block mt-3 text-sky-600">←ホームに戻る</span>
        </Link>
      </div>
    </section>
  );
};

export default Post;
